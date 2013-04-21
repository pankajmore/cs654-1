from fabric.api import env
from fabric.operations import run, put


cse = []
cc = []
all = []
for i in range(5,59):
    cse.append("172.27.19." + str(i))

for i in range(145,208):
    cc.append("172.31.4." + str(i))

all = cc + cse

env.hosts = cse
env.password = "Busted"
env.skip_bad_hosts = True
env.parallel = True
env.shell = '/bin/bash -l -c '

def elastic():
    # make sure the directory is there!
    #run('mkdir -p /home/frodo/tmp')

    # our local 'testdirectory' - it may contain files or subdirectories ...
    run('rm -rf /tmp/elasticsearch')
    put('elasticsearch', '/tmp/', mirror_local_mode=True)
    #run('chmod -R a+rw /tmp/elasticsearch')
    #run('chmod +x /tmp/elasticsearch/bin/elasticsearch')
    run('/tmp/elasticsearch/bin/elasticsearch', pty=False)

def kill():
    run('pkill -u pankajm java')

# [frodo@middleearth.com] Executing task 'copy'
# [frodo@middleearth.com] run: mkdir -p /home/frodo/tmp
# [frodo@middleearth.com] put: testdirectory/HELLO -> \
#     /home/frodo/tmp/testdirectory/HELLO
# [frodo@middleearth.com] put: testdirectory/WORLD -> \
#     /home/frodo/tmp/testdirectory/WORLD
# ...
