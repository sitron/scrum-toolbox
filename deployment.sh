#!/usr/bin/env bash
set -e

function echo_my_usage {
    echo
    echo "Usage: $0 ssh-alias git-tag-name"
    echo "  Example: $0 kim 2011121500"
    echo
}

if [ $# -ne 2 ]; then
    echo_my_usage
    exit 1
fi

TAG_NAME=$2
ACTIVE_SERVER=$1
EXPORT_DIR=../smbox-deploy
TAR_DIR=/tmp/smbox
GIT_URL="ssh://git@sitronnier.repositoryhosting.com/sitronnier/sm-box.git"
TAR_NAME=$TAG_NAME.tgz
LOCAL_TAR_FILE=$TAR_DIR/$TAR_NAME
# SERVER_TRANSFER_DIR is a directory relative to /home/laurent
SERVER_TRANSFER_DIR=deployment_smtoolbox


echo
echo "### Performing GIT export"
echo "Exporting code base from git."
cd $EXPORT_DIR
# TODO: add check if clone or pull needs to be done, and run accordingly
# TODO: check if export dir doesn't exist
# git clone --quiet $GIT_URL $EXPORT_DIR
git checkout master
git pull
git checkout --quiet $TAG_NAME
git submodule update --quiet --init --recursive
echo
echo "### Create a TAR with the code base"
rm -rf $TAR_DIR
mkdir $TAR_DIR
tar cfz $LOCAL_TAR_FILE --exclude '.git*' --exclude 'deployment.sh' --exclude 'vendors.py' --exclude 'bin/*' -C $EXPORT_DIR .
git checkout master
echo
echo "### Rsyncing to target server ($ACTIVE_SERVER)"
rsync -aH $TAR_DIR/ $ACTIVE_SERVER:/home/laurent/$SERVER_TRANSFER_DIR/
rm $LOCAL_TAR_FILE
echo "### finished"

