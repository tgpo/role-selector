$('#showMeTheCards').click(function()
{
	//getAvailableCollections()
	console.log(getMovementRatio())
	let movement = getMovementRatio()
	//getPlayerCount()
	
	let max = 100
	let min = 1
	
	
	console.log(getRandomNumbersWithAverage(getMovementRatio(), getPlayerCount() + 3, ((movement - 15 < min)? min : movement - 15), ((movement + 15 > max)? max : movement + 15)))
	
	$.getJSON( "data.json", function(data)
	{
	  var items = []
		
	  $.each(data, function(key, val) {
		items.push(val)
	  })

	  console.log(items.join(""))
	})
})


function getPlayerCount()
{
	let playercount = parseInt($('#players').val())
	
	return playercount
}


function getMovementRatio()
{
	let movementratio = parseInt($('#movement').val())
	
	return movementratio
}


function getAvailableCollections()
{
	let collections = $("input[name=collection]:checked")
	
	console.log('Collections: ')
	
	collections.each(function(){
		console.log($(this).val())
	})

}

function getRandomNumbersWithAverage(targetaverage, n, min, max)
{
	let sum = 0
	let newnumber = 0

  if (min > max)
  {
	  let temp = max
	  max = min
	  min = temp
  }
	
  if (targetaverage < min || targetaverage > max)
  {
	  return false
  }
  else if (targetaverage===min)
  {
	  return new Array(n).fill(min)
  }
  else if (targetaverage===max)
  {
	  return new Array(n).fill(max)
  }

  if (n < 1)
  {
	  return false
  }
  else if (n===1)
  {
	  return new Array(n).fill(targetaverage)
  }
  else
  {
    let numbers = new Array(n)
    
	for (var i=0; i < n; i++)
    {
		if (i>0)
		{
			sum = numbers.reduce((sum, x) => sum + x)
		}
		else
		{
			sum = 0
		}

      let average = (i>0 ? sum/(i+1) : (min+max)/2)
      let contrivednumber = targetaverage*(i+1) - sum
		
      // Last one must be contrived
      if (i==n-1)
	  {
		  newnumber = Math.ceil(contrivednumber) // Round up
	  }
      else
      {
        // The tolerance gets smaller with iteration
        let tolerance = (max-min)*(1-(i/(n-1)))
		
        let temp_min = (contrivednumber-tolerance)
        if (temp_min<min)
		{
			temp_min = min
		}
		  
        let temp_max = (contrivednumber+tolerance)

        if (temp_max>max)
		{
			temp_max = max
		}
		  
        newnumber = parseInt(Math.random() * (temp_max - temp_min) + temp_min)
		  
      }
		
		if (newnumber<1)
		{
		  newnumber = 0; // Handle -0
		}
		else if (newnumber > max)
		{
			newnumber = max
		}
      
		numbers[i] = newnumber
    }
	  
    // Since the numbers get more contrived towards the end, it might be nice to shuffle
    //shuffle($numbers);
    return numbers
  }
}
