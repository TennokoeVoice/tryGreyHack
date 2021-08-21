//connect rent server

pass = user_input("Enter Password: ", 1)
if pass == "passwd" then
	print("Access Granted")
else
	exit("Denied")
end if
connect = get_shell.connect_service("0.0.0.0", 22, "root", "passwd")
if connect then connect.start_terminal