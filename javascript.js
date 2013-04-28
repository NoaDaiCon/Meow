function f()
{
		const groundLevel = 80;
		frame = 0;
		var canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");

		width = 1000;
		height = 600;
		
		player = {
		x : 100,
		y : height - 350-groundLevel,
		width : 225,
		height : 350,
		speed: 15,
		jump : 30,
		velX: 0,
		velY: 0,
		dead : false,
		jumping: false
		};
		
		blocks = [];
		
		blocks["1"] = {
		x : width+700,
		y : height-100-groundLevel,
		width : 100,
		height : 100,
		speed: 15,
		isOnblock: false,
		blockIndex: 1,
		blockSlower: 0,
		isSaw: false,
		effectIndex : 1,
		effectSlower : 1,
		passHeight: 0,
		hasPassed : false
		}
		
		blocks["2"] = {
		x : width+1000,
		y : height-200-groundLevel,
		width : 100,
		height : 100,
		speed: 15,
		isOnblock: false,
		blockIndex: 1,
		blockSlower: 0,
		isSaw: false,
		effectIndex : 1,
		effectSlower : 1,
		passHeight: 0,
		hasPassed : false
		}
		
		blocks["3"] = {
		x : width+1000,
		y : height-100-groundLevel,
		width : 100,
		height : 100,
		speed: 15,
		isOnblock: false,
		blockIndex: 1,
		blockSlower: 0,
		isSaw: false,
		effectIndex : 1,
		effectSlower : 1,
		passHeight: 0,
		hasPassed : false
		}
		
		blocks["4"] = {
		x : width+1200,
		y : height-100-groundLevel,
		width : 100,
		height : 100,
		speed: 15,
		isOnblock: false,
		blockIndex: 1,
		blockSlower: 0,
		isSaw: false,
		effectIndex : 1,
		effectSlower : 1,
		passHeight: 0,
		hasPassed : false
		}
		
		blocks["5"] = {
		x : width+1700,
		y : height-100-groundLevel,
		width : 100,
		height : 100,
		speed: 15,
		isOnblock: false,
		blockIndex: 1,
		blockSlower: 0,
		isSaw: true,
		effectIndex : 1,
		effectSlower : 1,
		passHeight: 0,
		hasPassed : false
		}
		
		yPos2 = 0;
		yPos3= 0;
		
		hitbox = {
		x : player.x + 55,
		y : player.y+20-groundLevel,
		width : 85,
		height : player.height-35
		}
		
		gameVars = []
		
		keys = [];
		friction = 0.9;
		gravity = 2;
		frameSkipper = 0;
		animation = "images/main walk cycle000";
		falling = false;
		colour = "blue";
		deadTimer = 0;
		curTime = Date.now();
		checkSecond = Date.now();
		deltaTime2 = 1;
		backgroundIndex = 1;
		backgroundSlower = 1;
		foregroundIndex = 1;
		foregroundSlower = 1;
		isPaused = false;
		drawBlock = blocks.length;
		buildMode = false;
		buildPos = 0;
		buildFrame = 0;
		loading = false;
		noParallax = false;
		pos = [];
		babbyMode = false;
		flashing = false;
		health = 0;
		hasRun = false;
		goodEnd = false;
		badEnd = false;
		play = false;
		reallyDead = false;
		
		localStorage['loadPoint'] = frame;
		localStorage['musicTime'] = music.currentTime;
				
		tempPlayer = player;
		tempHitbox = hitbox;
		tempBlocks = [];
		/**checkpoint();**/
		for(var i = blocks.length-1; i > 0; i--)
		{
				tempBlocks[i] = blocks[i];
		}
		
		image = new Image();
		xPos = 0;
		xPos2 = 0;
		xPos3 = 0;
		yPos = 0;
		index = 0;
		numFrames = 8;
		trippyIndex = 0;
		prevMusic = 1.7;
		curMusic = music.currentTime;
		prevMusic2 = 1.7;
		curMusic2 = music.currentTime;
		music.currentTime = 1.7
	canvas.width = width;
	canvas.height = height;
	document.body.appendChild(canvas);
	loadImages();
		/**while(frame < 1887)
		{
			loading = true;
			update();
		}
		music.currentTime = 31.829774856;
		loading = false;**/
		menu();
	function menu()
	{
			var button1 = "buttons1";
			var button2 = "buttons4";
			ctx.drawImage(imageArray["menu"],  0, 0);
			ctx.drawImage(imageArray[button1],  width*8/15, height/4);
			ctx.drawImage(imageArray[button2],  width/6, height/4);
		
		document.body.addEventListener("mousedown", function(e)
		{
			if(!play)
			{
				var x=event.clientX;
				var y=event.clientY;
				if(x > 165 && x < 850)
				{
					if(y < 525 && y > 425)
					{
						play = true;
						if(babbyMode)
						{
							health = 5;
						}
						update();
					}
				}
				if(x > 175 && x < 465)
				{
					if(y > 165 && y < 300)
					{
						babbyMode = true;
						button1 = "buttons2";
						button2 = "buttons3";
					}
				}
				if(x > 540 && x < 830)
				{
					if(y > 165 && y < 300)
					{
						babbyMode = false;
						button1 = "buttons1";
						button2 = "buttons4";
					}
				}
				ctx.clearRect(0,0,width,height);
				
				ctx.drawImage(imageArray["menu"],  0, 0);
				ctx.drawImage(imageArray[button1],  width*8/15, height/4);
				ctx.drawImage(imageArray[button2],  width/6, height/4);
		}
		});
	}
	function update()
	{
		if(frame == 90)
		{
			music.play();
		}
		/**if(keys[80])
		{
			if(isPaused)
			{
				isPaused = false;
				music.play();
			}
			else
			{
				isPaused = true;
				music.pause();
			}
			keys[80] = false;
		}**/
		
		if(!(isPaused))
		{
		frame++;
		buildPos++;
		blockHandler();
		
		/**if(keys[76])
		{
			keys[76] = false;
			load();
		}**/
		/**if(keys[77])
		{
			localStorage['musicTime'] = 0;
			localStorage['loadPoint'] = 0;
		}**/
			/**if (keys[37])
			{
				if(player.velX > -player.speed)
				{
					player.velX--;
				}	
				else
				{
					player.velX++;
				}
			}**/
			/**if (keys[67])
			{
				keys[67] = false;
				checkpoint();
			}**/
			if (keys[38] || keys[32])
			{
			//u[p
				
				if(!player.jumping /**&& !player.dead**/&&frame > 10 && !reallyDead)
				{
					player.jumping = true;
					player.velY = -player.jump;
					index = 1;
				}
				if(reallyDead)
				{
					location.reload();
				}
			}
			/**if (keys[39])
			{
				if(player.velX < player.speed)
				{
					player.velX++;
				}
				else
				{
					player.velX--;
				}
			}**/
			
			player.velX *= friction;
			player.velY += gravity;
			
			if(player.velY >= 0)
			{
				falling = true;
			}
			else
			{
				falling = false;
			}
			player.x += player.velX;
			player.y += player.velY;
			
			processCollisions();
			hitbox.x = player.x + 70;
			hitbox.y = player.y+35;
			
			
			for(var i = blocks.length-1; i > 0; i--)
			{
				blocks[i].x -= blocks[i].speed;
			}
			ctx.clearRect(0,0,width,height);
			drawBackground();
			drawBlocks();
			walk();
			drawForeground();
			parallax();
			fps();
		}
		
		if(loading)
		{
		}
		else
		{
			requestAnimationFrame(update);
		}
	}
	
	document.body.addEventListener("keydown", function(e)
	{
		keys[e.keyCode] = true;
	});
	document.body.addEventListener("keyup", function(e){
		keys[e.keyCode] = false;
	});
	document.body.addEventListener("mousedown", function(e){
		keys[38] =true;
	});
	document.body.addEventListener("mouseup", function(e){
		keys[38]=false;
	});
	function walk()
	{
		if(frameSkipper >= 4)
		{
		index++;
		frameSkipper = 0;
		}
		frameSkipper++;
		if(index >= numFrames)
		{
			index = 0;
		}
		if(player.dead)
		{
			//
			dead();
		}
		
		if( animation != "dead")
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
		if(!flashing)
		{
			ctx.drawImage(imageArray[animation+(index+1)], player.x+20, player.y+10+yPos3, player.width, player.height);
		}
	}
	function processCollisions()
		{
			var collision = false;
			
			if(player.x >= width-player.width)
			{
				player.x = width-player.width;
			}
			else if(player.x <= 0)
			{
				player.x = 0;
			}
			if(player.y >= height-player.height-groundLevel)
			{
				player.y = height - player.height -groundLevel;
				player.jumping = false;
			}
			
			for(var i = blocks.length-1; i > 0; i--)
			{
				
				if((hitbox.x+hitbox.width)>=(blocks[i].x)&&hitbox.x<=(blocks[i].x+blocks[i].width))
				{
					if((hitbox.y+hitbox.height)<=blocks[i].y+25+player.velY&&hitbox.y+hitbox.height>=blocks[i].y && falling)
					{
						if(blocks[i].isSaw)
						{
							//
							//blocks[i].isOnBlock = false;
							player.dead = true;
						}
						else
						{
							player.y = blocks[i].y-player.height;
							player.jumping = false;
							player.velY = 0;
							blocks[i].isOnBlock = true;
						}
					}
					else if (hitbox.y >= blocks[i].y+blocks[i].height)
					{
						blocks[i].isOnBlock = false;
					}
					else if((hitbox.y+hitbox.height)>blocks[i].y-player.velY+25)
					{
						//
						//blocks[i].isOnBlock = false;
						player.dead = true;
					}
				}
				else
				{
					//blocks[i].hasPassed = false;
				}
				if((hitbox.x+hitbox.width)>=(blocks[i].x)&&hitbox.x<=(blocks[i].x+blocks[i].width)+100)
				{
					blocks[i].passHeight = player.y;
					blocks[i].hasPassed = true;
					if(blocks[i].x > width-600)
					{
						blocks[i].hasPassed = false;
					}
				}
				else
				{
					blocks[i].isOnBlock = false;
				}
			}
			
			if(player.y >= height-player.height-groundLevel)
			{
				player.velY = 0;
			}
		}
	function dead()
	{
			if(health > 0)
			{
				if(flashing)
				{
					flashing = false;
				}
				else
				{
					flashing = true;
				}
			}
			else
			{
				frame--;
				reallyDead = true;
				player.jumping = false;
				flashing = false;
				animation = "dead";
				player.speed = 0;
				for(var i = blocks.length-1; i > 0; i--)
				{
					blocks[i].speed = 0;
				}
				noParallax = true;
				player.width = 350;
				player.height = 160;
				player.y = height - player.height-groundLevel;
				music.pause();
				//location.reload();
			}
		if(deadTimer >= 60)
		{
			health--;
				//location.reload();
			player.dead = false;
			hitbox.width = 85;
			hitbox.height = 315;
			deadTimer = 0;
			flashing = false;
		}
		if(index >= 6)
		{
			index = 0;
		}
		deadTimer++;
	}
	function loadImages()
	{
		imageArray = [];
		animation = "images/winish";
		imageArray["winish"] = new Image();
		imageArray["winish"].src = animation+".PNG";
		
		animation = "images/menu";
		imageArray["menu"] = new Image();
		imageArray["menu"].src = animation+".PNG";
		var counter = 1;
		for(var i = 0; i < 18; i++)
		{
			if(i < 18)
			{
				if(i < 9)
				{
				animation = "images/win000";
				}
				else
				{
				animation = "images/win00";
				}
				imageArray["win"+(counter)] = new Image();
				imageArray["win"+(counter)].src = animation+(counter)+".PNG";
			}
			if(i < 15)
			{	
				if(i < 9)
				{
				animation = "images/Trippy1000";
				}
				else
				{
				animation = "images/Trippy100";
				}
				imageArray["trippy1"+(counter)] = new Image();
				imageArray["trippy1"+(counter)].src = animation+(counter)+".PNG";
			}
			if(i < 14)
			{	
				if(i < 9)
				{
					animation = "images/Explosion000";
				}
				else
				{
					animation = "images/Explosion00";
				}
				imageArray["explosion"+(counter)] = new Image();
				imageArray["explosion"+(counter)].src = animation+(counter)+".PNG";
			}
			if(i < 8)
			{
				animation = "images/main walk cycle000";
				imageArray["walk"+(counter)] = new Image();
				imageArray["walk"+(counter)].src = animation+(counter)+".PNG";
				
				animation = "images/Block Happy000";
				imageArray["onBlock"+(counter)] = new Image();
				imageArray["onBlock"+(counter)].src = animation+(counter)+".PNG";
			}
			if(i < 7)
			{
				animation = "images/T2000";
				imageArray["t2"+(counter)] = new Image();
				imageArray["t2"+(counter)].src = animation+(counter)+".PNG";
			}
			if(i < 6)
			{
				animation = "images/Dead000";
				imageArray["dead"+(counter)] = new Image();
				imageArray["dead"+(counter)].src = animation+(counter)+".PNG";
			}
			if(i < 5)
			{
				animation = "images/b1000";
				imageArray["b1"+(counter)] = new Image();
				imageArray["b1"+(counter)].src = animation+(counter)+".PNG";
				
				animation = "images/b2000";
				imageArray["b2"+(counter)] = new Image();
				imageArray["b2"+(counter)].src = animation+(counter)+".PNG";
				
				animation = "images/b3000";
				imageArray["b3"+(counter)] = new Image();
				imageArray["b3"+(counter)].src = animation+(counter)+".PNG";
				
				animation = "images/b4000";
				imageArray["b4"+(counter)] = new Image();
				imageArray["b4"+(counter)].src = animation+(counter)+".PNG";
				
				animation = "images/Mountain000";
				imageArray["mountains"+(counter)] = new Image();
				imageArray["mountains"+(counter)].src = animation+(counter)+".PNG";
			
			}
			if (i < 6)
			{
				animation = "images/Jump000";
				imageArray["jump"+(counter)] = new Image();
				imageArray["jump"+(counter)].src = animation+(counter)+".PNG";
			}
			if(i < 4)
			{
				animation = "images/Block000";
				imageArray["block"+(counter)] = new Image();
				imageArray["block"+(counter)].src = animation+(counter)+".PNG";
				
				animation = "images/Saw000";
				imageArray["saw"+(counter)] = new Image();
				imageArray["saw"+(counter)].src = animation+(counter)+".PNG";
				
				animation = "images/buttons000";
				imageArray["buttons"+(counter)] = new Image();
				imageArray["buttons"+(counter)].src = animation+(counter)+".PNG";
			}
			if(i < 2)
			{
				animation = "images/Terrain000";
				imageArray["ground"+(counter)] = new Image();
				imageArray["ground"+(counter)].src = animation+(counter)+".PNG";
				
				animation = "images/Heart000";
				imageArray["heart"+(counter)] = new Image();
				imageArray["heart"+(counter)].src = animation+(counter)+".PNG";
			}
			if(i < 3)
			{
				animation = "images/Trippy000";
				imageArray["trippy"+(counter)] = new Image();
				imageArray["trippy"+(counter)].src = animation+(counter)+".PNG";
			}
			counter++;
		}
	}
	function drawBackground()
	{
		if(music.currentTime < 33.66)
		{
			animation = "b1";
			ctx.drawImage(imageArray[animation+(backgroundIndex)],  0, 0);
		}
		else
		{
				//animation = "trippy";
			if(curMusic2 - prevMusic2 >= 0 )
			{
				trippyIndex = 0;
				animation = "trippy1";
			}
			if(curMusic2 - prevMusic2 >= .50)
			{
				//trippyIndex = 5;
				//animation = "trippy2";
			}
			if(curMusic2 - prevMusic2 >= 1.25)
			{
				//trippyIndex = 10;
				//animation = "trippy3";
			}
			if(curMusic2 - prevMusic2 >= 1.75)
			{
				//trippyIndex = 0;
				//animation = "trippy1";
			}
				ctx.drawImage(imageArray[animation+(backgroundIndex+trippyIndex)],0,0,width,450,  0, 0, width, 450);
			
			
			animation = "b3";
			ctx.drawImage(imageArray[animation+(backgroundIndex)],  0, 0);
		}
		
		if(music.currentTime < 33.66)
		{
			animation = "mountains";
			ctx.drawImage(imageArray[animation+(backgroundIndex)],  xPos3, yPos-groundLevel);
			ctx.drawImage(imageArray[animation+(backgroundIndex)],  xPos3+width, yPos-groundLevel);
		}
		if (music.currentTime>28)
		{
			drawScore();
		}
		if(music.currentTime < 33.66)
		{
			animation = "b2";
		}
		else
		{
			animation = "b4";
		}
			ctx.drawImage(imageArray[animation+(backgroundIndex)],  xPos, -groundLevel+yPos2);
			ctx.drawImage(imageArray[animation+(backgroundIndex)],  xPos+width, -groundLevel+yPos2);
		if(backgroundSlower == 6)
		{
		
		backgroundIndex++;
		backgroundSlower = 1;
		}
		if(backgroundIndex == 6)
		{
			backgroundIndex = 1;
		}
		backgroundSlower++;

	}
	function drawScore()
	{		
		animation = "explosion";
		for(var i = blocks.length-1; i > 0; i--)
		{
			if(blocks[i].hasPassed)
			{
				if(pos["x"+i] == -1)
				{
					pos["x"+i] = Math.random()*width;
					pos["y"+i] = Math.random()*height-400;
				}
				if(blocks[i].effectIndex <= 14 && music.currentTime>=33.66)
				{
					ctx.drawImage(imageArray[animation+(blocks[i].effectIndex)], pos["x"+i], pos["y"+i]);
				}
				
				if(blocks[i].effectSlower > 5)
				{
				
				blocks[i].effectIndex++;
				
				blocks[i].effectSlower = 1;
				}
				if(blocks[i].effectIndex == 14)
				{
					pos["x"+i] = -1;
					pos["y"+i] = -1;
					blocks[i].effectIndex = 1;
				}
				blocks[i].effectSlower++;
			}
		}
	}
	function drawForeground()
	{

		var x = 10;
		var y = 10;
		for(var i = 0; i < health; i++)
		{
			animation = "heart1";
			ctx.drawImage(imageArray[animation], x, y, 50, 50);
			x+= 50;
		}
		if(music.currentTime<33.66)
		{
			animation = "ground";
			ctx.drawImage(imageArray[animation+(foregroundIndex)], xPos2, height-140+yPos2);
			ctx.drawImage(imageArray[animation+(foregroundIndex)], xPos2+width, height-140+yPos2);
	
			if(foregroundSlower == 6)
			{
			
			foregroundIndex++;
			foregroundSlower = 1;
			}
			if(foregroundIndex == 2)
			{
				foregroundIndex = 1;
			}
			foregroundSlower++;
		}
		else
		{
			if(!goodEnd && !badEnd)
			{
				animation = "t2";
				ctx.drawImage(imageArray[animation+(foregroundIndex)], xPos2, height-192+yPos3);
				ctx.drawImage(imageArray[animation+(foregroundIndex)], xPos2+width, height-192+yPos3);
				if(foregroundSlower > 4 && frame < 4000)
				{
				
				foregroundIndex++;
				foregroundSlower = 1;
				}
				if(foregroundIndex == 7 && frame < 4000)
				{
					foregroundIndex = 1;
				}
				foregroundSlower++;
			}
		}
		if(goodEnd)
		{
			animation = "win";
			ctx.drawImage(imageArray[animation+(foregroundIndex)], 0, 0);
			ctx.drawImage(imageArray[animation+(foregroundIndex)], 0, 0);
			if(foregroundSlower > 6)
			{
			
			foregroundIndex++;
			foregroundSlower = 1;
			}
			if(foregroundIndex == 18)
			{
				foregroundIndex = 10;
			}
			foregroundSlower++;
		}
		if(badEnd)
		{
			animation = "winish";
			ctx.drawImage(imageArray[animation], 0, 0);
			ctx.drawImage(imageArray[animation], 0, 0);
		}
	}
	function parallax()
	{
		if(!noParallax)
		{
			xPos-= 2;
			if(xPos <= -width)
			{
			 xPos = 0;
			}
			xPos3 -= 1;
			if(xPos3 <= -width)
			{
			 xPos3 = 0;
			}
			xPos2 -= player.speed;
			if(xPos2 <= -width)
			{
				xPos2 = 0;
			}
		}
	}
	function drawBlocks()
	{	
		for (var i = blocks.length-1; i > 0; i--)
		{
			if(blocks[i].isSaw)
			{
				animation = "saw";
			}
			else
			{
				if(music.currentTime>=33.66 && !blocks[i].isSaw)
				{
					animation = "onBlock";
				}
				else if (!blocks[i].isSaw)
				{
					animation = "block";
				}
			}
			if(blocks[i].blockSlower >= 6)
			{
				blocks[i].blockIndex++;
				blocks[i].blockSlower = 0;
			}
			if(blocks[i].blockIndex >= 4 && (music.currentTime<33.66 || blocks[i].isSaw))
			{
				blocks[i].blockIndex = 1;
			}
			else if(blocks[i].blockIndex >= 8)
			{
				blocks[i].blockIndex = 1;
			}
			if(blocks[i].isSaw)
			{
				ctx.drawImage(imageArray[animation+(blocks[i].blockIndex)], blocks[i].x-20, blocks[i].y+yPos3)
			}
			else
			{
				if(blocks[i].isOnBlock)
				{
					ctx.drawImage(imageArray[animation+(blocks[i].blockIndex)], blocks[i].x, blocks[i].y+yPos3+5);
				}
				else
				{
					ctx.drawImage(imageArray[animation+(blocks[i].blockIndex)], blocks[i].x, blocks[i].y+yPos3);
				}
			}
			
			blocks[i].blockSlower++;
		}

	}
	function blockHandler()
	{
		if( frame<4000)
		{
			for (var i = 1; i <= blocks.length-1; i++)
			{
				if(blocks[i].x <= 0-blocks[i].width && blocks[i].x >= -15-blocks[i].width && !buildMode)
				{
					buildMode = true;
					buildPos = 0;
					buildFrame = frame;
					if(buildFrame > localStorage['loadPoint'])
					{
						
					}
					if(frame == 121)
					{
						blocks[i].x = width+600;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						blocks[i].isOnBlock = false;
						buildMode = false;
					}
					if(frame == 141)
					{
						blocks[i].x = width+700;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						blocks[i].isOnBlock = false;
						buildMode = false;
					}
					if(frame == 155)
					{
						blocks[i].x = width+600;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;
					}
					if(frame == 188)
					{
						blocks[i].x = width+105;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;
						
						blocks[blocks.length] = {
						x : width+400,
						y : height-100-groundLevel,
						width : 100,
						height : 100,
						speed: 15,
						isOnblock: false,
						blockIndex: 1,
						blockSlower: 0,
						isSaw: false,
						effectIndex : 1,
						effectSlower : 1,
						passHeight: 0,
						hasPassed : false
						}
					}
					if(frame == 235)
					{
						blocks[i].x = width;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;
					}
				
					if(frame == 261)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;
					}
					if(frame == 269)
					{
						blocks[i].x = width+100;
						blocks[i].isSaw = false;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;
					}
					if(frame == 288)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-400-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;
					}
					if(frame == 309)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;
					}
					if(frame == 341)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;
					}
					if(frame == 349)
					{
						blocks[i].x = (width*3)+300;
						blocks[i].y = height-150-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 30;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;
					}
					if(frame == 368)
					{
						blocks[i].x = width+900;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;
					}
					if(frame == 389)
					{
						blocks[i].x = width+800;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;
						
						blocks[blocks.length] = {
						x : width+1200,
						y : height-100-groundLevel,
						width : 100,
						height : 100,
						speed: 15,
						isOnblock: false,
						blockIndex: 1,
						blockSlower: 0,
						isSaw: true,
						effectIndex : 1,
						effectSlower : 1,
						passHeight: 0,
						hasPassed : false
						}	
					}
					if(frame == 421)
					{
						blocks[i].x = width+800;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;
						
						blocks[blocks.length] = {
						x : width+1300,
						y : height-200-groundLevel,
						width : 100,
						height : 100,
						speed: 15,
						isOnblock: false,
						blockIndex: 1,
						blockSlower: 0,
						isSaw: false,
						effectIndex : 1,
						effectSlower : 1,
						passHeight: 0,
						hasPassed : false
						}	
						blocks[blocks.length] = {
						x : width+1600,
						y : height-200-groundLevel,
						width : 100,
						height : 100,
						speed: 15,
						isOnblock: false,
						blockIndex: 1,
						blockSlower: 0,
						isSaw: true,
						effectIndex : 1,
						effectSlower : 1,
						passHeight: 0,
						hasPassed : false
						}	
					}
					if (frame == 502)
					{
						blocks[i].x = width;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;	
					}
					if(frame == 516)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-350-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 543)
					{
						blocks[i].x = width+200;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 548)
					{
						blocks[i].x = width+1300;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 576)
					{
						blocks[i].x = width+700;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 581)
					{
						blocks[i].x = width+1100;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 596)
					{
						blocks[i].x = width+1100;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 601)
					{
						blocks[i].x = width+1250;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 630)
					{
						blocks[i].x = width+3100;
						blocks[i].y = height-250-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 30;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 696)
					{
						blocks[i].x = width+300;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 708)
					{
						blocks[i].x = width+300;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 728)
					{
						blocks[i].x = width+200;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 743)
					{
						blocks[i].x = width+500;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 758)
					{
						blocks[i].x = width+400;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 770)
					{
						blocks[i].x = width+500;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 790)
					{
						blocks[i].x = width+4800;
						blocks[i].y = height-150-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 30;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 802)
					{
						blocks[i].x = width+5300;
						blocks[i].y = height-150-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 30;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 815)
					{
						blocks[i].x = width+5800;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 30;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 850)
					{
						blocks[i].x = width+2500;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 858)
					{
						blocks[i].x = width+3300;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 877)
					{
						blocks[i].x = width+3600;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 987)
					{
						blocks[i].x = width+2600;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 987)
					{
						blocks[i].x = width+2600;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1045)
					{
						blocks[i].x = width+2600;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1090)
					{
						blocks[i].x = width+2600;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1152)
					{
						blocks[i].x = width+1900;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1191)
					{
						blocks[i].x = width+1500;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1234)
					{
						blocks[i].x = width+1100;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1292)
					{
						blocks[i].x = width+400;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1337)
					{
						blocks[i].x = width;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
						if(frame == 1352)
					{
						blocks[i].x = width;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
						if(frame == 1365)
					{
						blocks[i].x = width;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
						if(frame == 1381)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
						if(frame == 1392)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
						if(frame == 1436)
					{
						blocks[i].x = width;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1411)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1426)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1439)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1461)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1472)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1485)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
						if(frame == 1491)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1506)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1519)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1541)
					{
						blocks[i].x = width;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1552)
					{
						blocks[i].x = width+50;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1571)
					{
						blocks[i].x = width+50;
						blocks[i].y = height-250-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1586)
					{
						blocks[i].x = width;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1599)
					{
						blocks[i].x = width;
						blocks[i].y = height-250-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
						if(frame == 1615)
					{
						blocks[i].x = width;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1629)
					{
						blocks[i].x = width;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1648)
					{
						blocks[i].x = width;
						blocks[i].y = height-250-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1660)
					{
						blocks[i].x = width;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1673)
					{
						blocks[i].x = width;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1689)
					{
						blocks[i].x = width;
						blocks[i].y = height-250-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1703)
					{
						blocks[i].x = width;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1722)
					{
						blocks[i].x = width;
						blocks[i].y = height-250-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1734)
					{
						blocks[i].x = width;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1747)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1763)
					{
						blocks[i].x = width+100;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1777)
					{
						blocks[i].x = width+150;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1796)
					{
						blocks[i].x = width+150;
						blocks[i].y = height-200-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1808)
					{
						blocks[i].x = width+150;
						blocks[i].y = height-300-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1827)
					{
						blocks[i].x = width+3000;
						blocks[i].y = height-150-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 30;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						buildMode = false;			
					}
					if(frame == 1843)
					{
						blocks[i].x = width+1300;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = true;
						blocks[i].speed = 15;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						blocks[i].isOnBlock = false;
						buildMode = false;			
					}
					if(frame == 1861)
					{
						blocks[i].x = width+1800;
						blocks[i].y = height-100-groundLevel;
						blocks[i].isSaw = false;
						blocks[i].speed = 17.5;
						blocks[i].effectIndex = 1;
						blocks[i].effectSlower = 1;
						blocks[i].isOnBlock = false;
						buildMode = false;			
					}
				}
				else if( i == blocks.length-1)
				{
					drawBlock = blocks.length;
				}
					if(frame == 2110)
					{
							blocks[12].y = height-200-groundLevel;
							blocks[13].y = height-300-groundLevel;
							blocks[14].y = height-400-groundLevel;
							blocks[15].y = height-300-groundLevel;
					}
					if(frame == 2200)
					{
							blocks[16].y = height-200-groundLevel;
							blocks[17].y = height-300-groundLevel;
							blocks[18].y = height-400-groundLevel;
							blocks[19].y = height-300-groundLevel;
					}
					if(frame == 2334)
					{
							blocks[12].y = height-100-groundLevel;
							blocks[13].y = height-200-groundLevel;
							blocks[14].y = height-300-groundLevel;
							blocks[15].y = height-200-groundLevel;
					}
					if(frame == 2437)
					{
							blocks[16].y = height-100-groundLevel;
							blocks[17].y = height-200-groundLevel;
							blocks[18].y = height-300-groundLevel;
							blocks[19].y = height-200-groundLevel;
					}
					if(frame == 2564)
					{
							blocks[14].y = height-200-groundLevel;
					}
					if(frame == 2586)
					{
							blocks[18].y = height-200-groundLevel;
					}
					if(frame == 2680)
					{
							blocks[18].y = height-300-groundLevel;
					}
					if(frame == 2740)
					{
							blocks[14].y = height-300-groundLevel;
					}
					if(frame == 3020)
					{
							blocks[12].y = height-200-groundLevel;
							blocks[13].y = height-300-groundLevel;
							blocks[14].y = height-400-groundLevel;
							blocks[15].y = height-300-groundLevel;
					}
					if(frame == 3210)
					{
							blocks[16].y = height-200-groundLevel;
							blocks[17].y = height-300-groundLevel;
							blocks[18].y = height-400-groundLevel;
							blocks[19].y = height-300-groundLevel;
					}
					if(frame == 3300)
					{
							blocks[12].y = height-100-groundLevel;
							blocks[13].y = height-200-groundLevel;
							blocks[14].y = height-300-groundLevel;
							blocks[15].y = height-200-groundLevel;
					}
					if(frame == 3470)
					{
							blocks[16].y = height-100-groundLevel;
							blocks[17].y = height-200-groundLevel;
							blocks[18].y = height-300-groundLevel;
							blocks[19].y = height-200-groundLevel;
					}
					if(frame == 3500)
					{
							blocks[14].y = height-200-groundLevel;
					}
					if(frame == 3680)
					{
							blocks[18].y = height-200-groundLevel;
					}
					if(frame == 3700)
					{
							blocks[18].y = height-300-groundLevel;
					}
					if(frame == 3740)
					{
							blocks[14].y = height-300-groundLevel;
					}
					if(frame > 3990)
					{
							if(babbyMode)
							{
								badEnd = true;
							}
							else
							{
								goodEnd = true;
							}
					}
				if(frame>=2000)
					{
						if(!hasRun)
						{
							blocks[blocks.length] = {
							x : width,
							y : height-100-groundLevel,
							width : 100,
							height : 100,
							speed: 17.5,
							isOnblock: false,
							blockIndex: 1,
							blockSlower: 0,
							isSaw: false,
							effectIndex : 1,
							effectSlower : 1,
							passHeight: 0,
							hasPassed : false
							}
							
							blocks[blocks.length] = {
							x : width+250,
							y : height-200-groundLevel,
							width : 100,
							height : 100,
							speed: 17.5,
							isOnblock: false,
							blockIndex: 1,
							blockSlower: 0,
							isSaw: false,
							effectIndex : 1,
							effectSlower : 1,
							passHeight: 0,
							hasPassed : false
							}
							
							blocks[blocks.length] = {
							x : width+500,
							y : height-300-groundLevel,
							width : 100,
							height : 100,
							speed: 17.5,
							isOnblock: false,
							blockIndex: 1,
							blockSlower: 0,
							isSaw: false,
							effectIndex : 1,
							effectSlower : 1,
							passHeight: 0,
							hasPassed : false
							}
							
							blocks[blocks.length] = {
							x : width+750,
							y : height-200-groundLevel,
							width : 100,
							height : 100,
							speed: 17.5,
							isOnblock: false,
							blockIndex: 1,
							blockSlower: 0,
							isSaw: false,
							effectIndex : 1,
							effectSlower : 1,
							passHeight: 0,
							hasPassed : false
							}
							blocks[blocks.length] = {
							x : width+1000,
							y : height-100-groundLevel,
							width : 100,
							height : 100,
							speed: 17.5,
							isOnblock: false,
							blockIndex: 1,
							blockSlower: 0,
							isSaw: false,
							effectIndex : 1,
							effectSlower : 1,
							passHeight: 0,
							hasPassed : false
							}
							blocks[blocks.length] = {
							x : width+1250,
							y : height-200-groundLevel,
							width : 100,
							height : 100,
							speed: 17.5,
							isOnblock: false,
							blockIndex: 1,
							blockSlower: 0,
							isSaw: false,
							effectIndex : 1,
							effectSlower : 1,
							passHeight: 0,
							hasPassed : false
							}
							blocks[blocks.length] = {
							x : width+1500,
							y : height-300-groundLevel,
							width : 100,
							height : 100,
							speed: 17.5,
							isOnblock: false,
							blockIndex: 1,
							blockSlower: 0,
							isSaw: false,
							effectIndex : 1,
							effectSlower : 1,
							passHeight: 0,
							hasPassed : false
							}
							blocks[blocks.length] = {
							x : width+1750,
							y : height-200-groundLevel,
							width : 100,
							height : 100,
							speed: 17.5,
							isOnblock: false,
							blockIndex: 1,
							blockSlower: 0,
							isSaw: false,
							effectIndex : 1,
							effectSlower : 1,
							passHeight: 0,
							hasPassed : false
							}
							hasRun = true;
						}
						if(i >= 12 && frame < 3760)
						{
							if(blocks[i].x <= 0-(blocks[i].width)-(width*4/5))
							{
								blocks[i].x = width + blocks[i].width;
							}
						}
						
					}
			}
		}
	}
	function fps()
	{
		prevTime = curTime;
		curTime = Date.now();
		deltaTime = curTime - prevTime;
		
		if(curMusic - prevMusic >= 8)
		{
			prevMusic = curMusic;
		}
		curMusic = music.currentTime
		
		if(curMusic2 - prevMusic2 >= 2)
		{
			prevMusic2 = curMusic2;
		}
		curMusic2 = music.currentTime
		
		if(curTime - 1000 >= checkSecond)
		{
			checkSecond = curTime;
			deltaTime2 = checkSecond - prevTime;
			ctx.fillStyle = "12px, Black";
		}
		if(music.currentTime>=1.701 && music.currentTime<34)
		{
			if(curTime - 500 >= checkSecond)
			{
				yPos=15;
			}
			else
			{
				yPos=0;
			}
			if(music.currentTime>=17.7)
			{
				if(curMusic - prevMusic >= 0)
				{
					yPos2 = 20;
					yPos3 = 20;
				}
				if(curMusic - prevMusic >= 2.5)
				{
					yPos2 = -20;
					yPos3 = -20;
				}
				if(curMusic - prevMusic >= 3.25)
				{
					yPos2 = 20;
					yPos3 = 20;
				}
				if(curMusic - prevMusic >= 4)
				{
					yPos2 = -20;
					yPos3 = -20;
				}
				if(curMusic - prevMusic >= 6.5)
				{
					yPos2 = 20;
					yPos3 = 20;
				}
				if(curMusic - prevMusic >= 7.25 && music.currentTime >= 18)
				{
					yPos2 = -20;
					yPos3 = -20;
				}
			}
		}
		if(music.currentTime>=32.6)
		{
				yPos = 100;
				//yPos2 = 100;
		}
		
		if(music.currentTime>=33.1)
		{
			yPos= 300;
			//yPos2 = 300;
		}
			if(yPos2 < 1000)
			{
				//yPos2+=20;
			}
			
		
		
		if(music.currentTime>=33.66)
		{
		}
			
			/**ctx.font="50px Georgia";
			ctx.fillText(1000/deltaTime2, 100, 100);
		timeToDraw = 
		ctx.font = "15px, georgia";
		ctx.fillText((frame),500,20);
		ctx.fillText((buildPos*player.speed)-width,700,40);
		ctx.fillText((buildFrame),700,90);
		ctx.fillText(music.currentTime,700,300);**/
	}
	/**function load()
	{
		frame = localStorage['loadPoint'];
		music.currentTime = localStorage['musicTime'];
		var i = 0;
		keys = gameVars[i];
		i++;
		friction = gameVars[i];
		i++;
		gravity = gameVars[i];
		i++;
		frameSkipper = gameVars[i];
		i++;
		animation = gameVars[i];
		i++;
		falling = gameVars[i];
		i++;
		colour = gameVars[i];
		i++;
		deadTimer = gameVars[i];
		i++;
		curTime = gameVars[i];
		i++;
		checkSecond = gameVars[i];
		i++;
		deltaTime2 = gameVars[i];
		i++;
		backgroundIndex = gameVars[i];
		i++;
		backgroundSlower = gameVars[i];
		i++;
		foregroundIndex = gameVars[i];
		i++;
		foregroundSlower = gameVars[i];
		i++;
		isPaused = gameVars[i];
		i++;
		drawBlock = gameVars[i];
		i++;
		buildMode = gameVars[i];
		i++;
		buildPos = gameVars[i];
		i++;
		buildFrame = gameVars[i];
		i++;
		loading = gameVars[i];
		i++;
		frame = gameVars[i];
		i++;
		player.x = gameVars[i];
		i++;
		player.y = gameVars[i];
		i++;
		player.width = gameVars[i];
		i++;
		player.height = gameVars[i];
		i++;
		player.speed = gameVars[i];
		i++;
		player.jump = gameVars[i];
		i++;
		player.velX = gameVars[i];
		i++;
		player.velY = gameVars[i];
		i++;
		player.dead = gameVars[i];
		i++;
		player.jumping = gameVars[i];
		i++;
		for (var temp = 1; temp <= blocks.length-1; temp++)
		{
			blocks[temp].x = gameVars[i];
			i++;
			blocks[temp].y = gameVars[i];
			i++;
			blocks[temp].width = gameVars[i];
			i++;
			blocks[temp].height = gameVars[i];
			i++;
			blocks[temp].speed = gameVars[i];
			i++;
			blocks[temp].isOnblock = gameVars[i];
			i++;
			blocks[temp].blockIndex = gameVars[i];
			i++;
			blocks[temp].blockSlower = gameVars[i];
			i++;
			blocks[temp].isSaw = gameVars[i];
			i++;
		}
		hitbox.x = gameVars[i];
		i++;
		hitbox.y = gameVars[i];
		i++;
		hitbox.width = gameVars[i];
		i++;
		hitbox.height = gameVars[i];
		i++;
	}
	function checkpoint()
	{
		localStorage['loadPoint'] = frame;
		localStorage['musicTime'] = music.currentTime;
		var i = 0;
		gameVars[i] = keys;
		i++;
		gameVars[i] = friction;
		i++;
		gameVars[i] = gravity;
		i++;
		gameVars[i] = frameSkipper;
		i++;
		gameVars[i] = animation;
		i++;
		gameVars[i] = falling;
		i++;
		gameVars[i] = colour;
		i++;
		gameVars[i] = deadTimer;
		i++;
		gameVars[i] = curTime;
		i++;
		gameVars[i] = checkSecond;
		i++;
		gameVars[i] = deltaTime2;
		i++;
		gameVars[i] = backgroundIndex;
		i++;
		gameVars[i] = backgroundSlower;
		i++;
		gameVars[i] = foregroundIndex;
		i++;
		gameVars[i] = foregroundSlower;
		i++;
		gameVars[i] = isPaused;
		i++;
		gameVars[i] = drawBlock;
		i++;
		gameVars[i] = buildMode;
		i++;
		gameVars[i] = buildPos;
		i++;
		gameVars[i] = buildFrame;
		i++;
		gameVars[i] = loading;
		i++;
		gameVars[i] = frame;
		i++;
		gameVars[i] = player.x;
		i++;
		gameVars[i] = player.y;
		i++;
		gameVars[i] = player.width;
		i++;
		gameVars[i] = player.height;
		i++;
		gameVars[i] = player.speed;
		i++;
		gameVars[i] = player.jump;
		i++;
		gameVars[i] = player.velX;
		i++;
		gameVars[i] = player.velY;
		i++;
		gameVars[i] = player.dead;
		i++;
		gameVars[i] = player.jumping;
		i++;
		for (var temp = 1; temp <= blocks.length-1; temp++)
		{
			gameVars[i] = blocks[temp].x;
			i++;
			gameVars[i] = blocks[temp].y;
			i++;
			gameVars[i] = blocks[temp].width;
			i++;
			gameVars[i] = blocks[temp].height;
			i++;
			gameVars[i] = blocks[temp].speed;
			i++;
			gameVars[i] = blocks[temp].isOnblock;
			i++;
			gameVars[i] = blocks[temp].blockIndex;
			i++;
			gameVars[i] = blocks[temp].blockSlower;
			i++;
			gameVars[i] = blocks[temp].isSaw;
			i++;
		}
		gameVars[i] = hitbox.x;
		i++;
		gameVars[i] = hitbox.y;
		i++;
		gameVars[i] = hitbox.width;
		i++;
		gameVars[i] = hitbox.height;
		i++;
	}**/
}