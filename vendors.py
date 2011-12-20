import os
import ConfigParser
import subprocess

def main():
    rcp = ConfigParser.SafeConfigParser(allow_no_value=True)
    rcp.read('deps')

    for sect in rcp.sections():
        target_dir = 'vendor'

        try:
            target = rcp.get(sect, 'target')
        except ConfigParser.NoOptionError:
            target = ''

        try:
            version = rcp.get(sect, 'version')
        except ConfigParser.NoOptionError:
            version = None

        if target:
            target_dir = os.path.join(target_dir, target[1:])
        else:
            target_dir = os.path.join(target_dir, sect)

        options = ['-f',]

        command = ['git', 'submodule', 'add']
        command.extend(options)
        command.extend([rcp.get(sect, 'git'), target_dir])

        subprocess.call(command)
        subprocess.Popen('git checkout %s' % version, cwd=target_dir,\
                shell=True, stdout=None)

if __name__ == '__main__':
    main()
