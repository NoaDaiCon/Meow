
function f()
{
		const FPS = 60;
		var v = document.getElementById("v");
		v.addEventListener("play");
		var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),

		width = 1000,
		height = 600
		
		curTime = Date.now()
		checkSecond = Date.now();
		deltaTime2 = 1;
		fps();
		
		player = {
		x : 100,
		y : height - 350,
		width : 225,
		height : 350,
		speed: 1000,
		jump : 30,
		velX: 0,
		velY: 0,
		dead : false,
		jumping: false
		};
		
		object = {
		x : width,
		y : height-100,
		width : 100,
		height : 100,
		speed: 15
		}
		hitbox = {
		x : player.x + 55,
		y : player.y+10,
		width : 100,
		height : player.height-25
		}
		keys = [];
		friction = 0.9;
		gravity = 2;
		frameSkipper = 0;
		animation = "images/main walk cycle000";
		falling = false;
		colour = "blue";
		deadTimer = 0;
		backgroundIndex = 1;
		backgroundSlower = 1;
		
		image = new Image();
		xPos = 0;
		yPos = 0;
		index = 0;
		numFrames = 7;
		
	canvas.width = width;
	canvas.height = height;
	document.body.appendChild(canvas);
	loadImages();
	v.play();
	
	update();	
	
	function update()
	{
		if (keys[37])
		{
			if(player.velX > -player.speed)
			{
				player.velX--;
			}	
			else
			{
				player.velX++;
			}
		}
		if (keys[38] || keys[32])
		{
		//u[p
			
			if(!player.jumping)
			{
				player.jumping = true;
				player.velY = -player.jump;
				index = 1;
			}
		}
		if (keys[39])
		{
			if(player.velX < player.speed)
			{
				player.velX++;
			}
			else
			{
				player.velX--;
			}
		}
		
		player.velX *= friction;
		player.velY += gravity*(FPS/(1000/deltaTime));
		
		if(player.velY >= 0)
		{
			falling = true;
		}
		else
		{
			falling = false;
		}
		player.x += player.velX*(FPS/(1000/deltaTime));
		player.y += player.velY*(FPS/(1000/deltaTime));
		
		fps();
		processCollisions();
		
		hitbox.x = (player.x + 55);
		hitbox.y = (player.y+25);
		object.x = 500;
			
		ctx.clearRect(0,0,width,height);
		ctx.fillStyle = "red";
		
		drawBackground();
		ctx.fillStyle = colour;
		ctx.fillRect(object.x, object.y, object.width, object.height);
		walk();

		setTimeout(function() {requestAnimationFrame(update);
		}, 1000 / 60);

	}
	
	document.body.addEventListener("keydown", function(e)
	{
		keys[e.keyCode] = true;
	});
	document.body.addEventListener("keyup", function(e){
		keys[e.keyCode] = false;
	});
	
	function walk()
	{
		if(frameSkipper >= 4)
		{
		index++;
		frameSkipper = 0;
		}
		if(dead)
		{
			animation = "dead";
		}
		frameSkipper++;
		if(index >= numFrames)
		{
			index = 0;
		}
		if(player.dead)
		{
			dead();
		}
		else
		{
			animation = "walk";
			if(player.jumping)
			{
				animation = "jump";
				if (index > 5)
				{
					index = 3;
				}
			}
		}
			ctx.fillText(player.velY, 100, 300);
		ctx.drawImage(imageArray[animation+(index+1)], 0, 0, player.width, player.height, player.x+20, player.y+10, player.width, player.height);
	}
	function processCollisions()
		{
		
			var collision = false;
			
			if((hitbox.x+hitbox.width)>=(object.x)&&hitbox.x<=(object.x+object.width))
			{
				if((hitbox.y+hitbox.height)<=object.y+15+(Math.abs(player.velY)+gravity)*(FPS/(1000/deltaTime))&&hitbox.y+hitbox.height>=object.y && falling)
				{
					player.y = object.y-player.height;
					player.jumping = false;
					player.velY = 0;
					colour = "blue";
				}
				else if((hitbox.y+hitbox.height)>object.y)
				{
					colour = "red";
					player.width = 350;
					player.height = 160;
					player.y = height - player.height;
					player.dead = true;
				}
			}
			if(player.x >= width-player.width)
			{
				player.x = width-player.width;
			}
			else if(player.x <= 0)
			{
				player.x = 0;
			}
			if(player.y >= height-player.height)
			{
				player.velY=0;
				player.y = height - player.height;
				player.jumping = false;
			}
			
	
			
			if(object.x <= 0 - object.width)
			{
				object.x = width;
			}
		}
	function dead()
	{
		if(deadTimer >= 60)
		{
			player.dead = false;
			player.width = 225;
			player.height = 350;
			player.width = 225;
			player.height = 350;
			
			deadTimer = 0;
		}
		if(index >= 6)
		{
			index = 0;
		}
		deadTimer++;
		ctx.drawImage(imageArray[animation+(index+1)], 0, 0, player.width, player.height, player.x+20, player.y+10, player.width, player.height);
	}
	function loadImages()
	{
		imageArray = [];
		var counter = 1;
		for(var i = 0; i < 7; i++)
		{
			if(i < 7)
			{
				animation = "images/main walk cycle000";
				imageArray["walk"+(counter)] = new Image();
				imageArray["walk"+(counter)].src = animation+(counter)+".PNG";
			}
			if(i < 6)
			{
				animation = "images/Dead000";
				imageArray["dead"+(counter)] = new Image();
				imageArray["dead"+(counter)].src = animation+(counter)+".PNG";
			}
			if (i < 6)
			{
				animation = "images/Jump000";
				imageArray["jump"+(counter)] = new Image();
				imageArray["jump"+(counter)].src = animation+(counter)+".PNG";
			}
			counter++;
		}
	}
	function drawBackground()
	{
		ctx.drawImage(v,  0, 0);
	}
	function fps()
	{
		prevTime = curTime;
		curTime = Date.now();
		deltaTime = curTime - prevTime;
		if(curTime - 1000 >= checkSecond)
		{
			checkSecond = curTime;
			deltaTime2 = checkSecond - prevTime;
			ctx.fillStyle = "32px, Red";
		}
			ctx.fillText(1000/deltaTime, 100, 100);
			ctx.fillText((60/(1000/deltaTime)), 100, 200);
	}
}