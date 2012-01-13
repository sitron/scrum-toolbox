#!/usr/bin/python
'''A script to create/update git submodules out of the Symfony2 deps file'''

from ConfigParser import SafeConfigParser
from shutil import copyfile
from os import unlink, path, chdir
from subprocess import Popen
import subprocess
import sys

def main():
    # make sure either install or update is specified
    if len(sys.argv) < 2 or sys.argv[1] not in ['install', 'update']:
        help()
        return

    # target directory
    target_dir = 'vendor'

    # create a tmp version of deps so that it's readable by configparser
    f = open('deps', 'r')
    n = open('deps.tmp', 'w')
    for line in f:
        n.write(line.strip())
        n.write('\n')
    n.close()
    f.close()

    # read tmp deps file
    parser = SafeConfigParser()
    parser.read('deps.tmp')

    for bundle_name in parser.sections():

        if parser.has_option(bundle_name, 'target'):
            bundle_dir = path.join(target_dir, parser.get(bundle_name, 'target')[1:])
        else:
            bundle_dir = path.join(target_dir, bundle_name)

        print 'Bundle: %s to %s' % (bundle_name, bundle_dir)

        if sys.argv[1] == 'install':
            print 'adding submodule %s' % parser.get(bundle_name, 'git')
            command = ['git', 'submodule', 'add', '-f', parser.get(bundle_name, 'git'), bundle_dir]

            subprocess.call(command)


        command = ['git', 'fetch']
        subprocess.call(command, cwd=bundle_dir)

        if parser.has_option(bundle_name, 'version'):
            print 'checking out %s' % parser.get(bundle_name, 'version')
            command = ['git', 'checkout', parser.get(bundle_name, 'version')]
            subprocess.call(command, cwd=bundle_dir)

    unlink('deps.tmp')

def help():
    print 'call this script with either \'install\' or \'update\' as argument'

if __name__ == '__main__':
    main()

