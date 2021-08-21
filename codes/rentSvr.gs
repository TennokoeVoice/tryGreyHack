//connect rent server

pass = user_input("Enter Password: ", 1)
if pass == "passwd" then // "passwd" 好みのパスワードを設定
	print("Access Granted")
else
	exit("Denied")
end if
connect = get_shell.connect_service("0.0.0.0", 22, "root", "passwd") // レンタルサーバーのアカウント情報を設定
if connect then connect.start_terminal