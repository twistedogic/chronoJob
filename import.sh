curl -XPUT 10.0.0.114:9200/_river/my_csv_river/_meta -d '
{
    "type" : "csv",
    "csv_file" : {
        "folder" : "/home/guest/chronoJob/node/info/0001-4.csv",
        "first_line_is_header":"true"
    }
}'