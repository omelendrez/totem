Set objChrome = CreateObject("Wscript.Shell")
objChrome.Run "chrome"
WScript.Sleep 200
objChrome.sendkeys "http://192.168.20.250:5030"
objChrome.sendkeys "{ENTER}"
objChrome.sendkeys "{F11}"
Set objChrome = Nothing