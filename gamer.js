class truck extends soldier {
    constructor(x, y, width, height){
      super(x,y,width,height);
      this.image = loadImage("Unimog_.png");
    }

	display()
	{
		var Pos = this.body.position;
		push();
		imageMode(CENTER)
		image(this.image,Pos.x, Pos.y+20,this.w, this.h);
		pop();
			
	}

  };