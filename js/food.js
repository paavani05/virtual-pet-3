class Food{
    constructor(){
        this.image = loadImage("images/milk.png");
        this.foodStock = 0;
        this.lastFed = 0;
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodS){
        this.foodStock = foodS;
    }

    getFedTime(lastFed) {
        this.lastFed = lastFed;
    }

    deductFood(){
        if (this.foodStock>0){
            this.foodStock = this.foodStock - 1;
        }
        return this.foodStock
    }

    bedroom(){
        background(bedroom, 500, 550)
    }

    garden(){
        background(garden,500,550);
    }

    washroom(){
        background(washroom,500,550);
    }

    display(){
        var x = 80, y = 100;

        //imageMode(CENTER);
        image(this.image, 560,220,70,70);
        
        if(this.foodstock!=0){
            for(var i=0; i<this.foodStock; i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30
            }
        }
    }
}