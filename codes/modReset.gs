//Re"set" permission

get_shell.host_computer.File("/").chmod("o-wrx", 1)
get_shell.host_computer.File("/").chmod("g-wrx", 1)
get_shell.host_computer.File("/").chmod("u-wrx", 1)