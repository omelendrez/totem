@echo off
rem set year=%DATE:~5,4%
rem set month=%DATE:~8,2%
rem set day=%DATE:~0,2%
rem set hour=%TIME:~0,2%
rem set minute=%TIME:~3,2%
rem set backuptime=%year%%month%%day%%hour%%minute%
set backuptime=%DATE:~11,4%%DATE:~8,2%%DATE:~5,2%
echo "%backuptime%"
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump" -u escng_totem escng_totem --databases --column-statistics=0 -h localhost --password=M1a4$1t4E8r0 > "%backuptime%".sql
exit