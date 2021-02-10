class ground
{
	constructor(x,y,w,h)
	{
		var options={
			isStatic:true,	
			restitution :0,
			friction :1,
			density:7.8		
			}
		this.x=x;
		this.y=y;
		this.w=w
		this.h=h
		this.body=Bodies.rectangle(x, y, w, h , options);
 		World.add(world, this.body);

	}
	display()
	{       
		push();
			var Pos=this.body.position;		
			fill(70,54,32)
			rectMode(CENTER);
			rect(Pos.x, Pos.y,this.w, this.h);
		pop()
			
	}

}