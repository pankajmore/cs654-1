curl -XPOST 'http://172.24.1.166:9200/foo/doc?pretty=1'  -d '
{
   "file" : '`base64 $1 | perl -pe 's/\n/\\n/g'`'
}
'
