$('#showMeTheCards').click(function()
{
	getAvailableCollections()
	getMovementRatio()
	getPlayerCount()
})


function getPlayerCount()
{
	let playercount = $('#players').val()
	
	console.log('Players: ' + playercount)
}


function getMovementRatio()
{
	let movementratio = $('#movement').val()
	
	console.log('Movement Ratio: ' + movementratio)
}


function getAvailableCollections()
{
	let collections = $("input[name=collection]:checked")
	
	console.log('Collections: ')
	
	collections.each(function(){
		console.log($(this).val())
	})

}
