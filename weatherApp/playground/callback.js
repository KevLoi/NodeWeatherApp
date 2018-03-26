var getUser = (id, callBack) =>
{
	var user = 
	{
		id: id,
		name: 'Vikram'
	};

	setTimeout(() =>
	{
		callBack(user);
	});
};

getUser(31, (userObject) =>
{
	console.log(userObject);
});