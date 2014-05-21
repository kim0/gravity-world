/**
 * Shell Entity
 */
game.Shell = me.ObjectEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        this.gravity = me.sys.gravity;
        this.name = "Shell";
        this.setVelocity(5, 15);

        this.canGoRight = true;
        this.canGoLeft = true;
    },

    update: function(dt) {
        this.gravity = me.sys.gravity;
        // if (res.yprop.type && res.yprop.type != "solid") console.log("res.yprop.type", res.yprop.type);
        // if (res.xprop.type && res.xprop.type != "solid") console.log("res.xprop.type", res.xprop.type);

        this.canGoRight = true;
        this.canGoLeft = true;

        // update shell position
        var res = this.updateMovement();
        if (res.xprop.type == "solid") {
            // x axis
            if (res.x < 0) {
                this.canGoLeft = false;
                // console.log("x axis : left side !");
            } else {
                this.canGoRight = false;
                // console.log("x axis : right side !");
            }
        }

        // check for collision
        var collision = me.game.world.collide(this);

        if (collision) {
            console.log(this.name, " Collision with ", collision.obj.name);
        }
        if (collision && collision.obj.name == "Rock") {
            //console.log("Collision with", collision.obj.name);

            // if we collide with the player
            if (collision.obj.name == "Rock") {
                if (collision.x > 0) {
                    this.vel.x -= this.accel.x * me.timer.tick;
                } else {
                    this.vel.x += this.accel.x * me.timer.tick;
                }
            }
        } else {
            this.vel.x = 0;
        }

// check for collision result with the environment
// if (res.x != 0)
// {
//   // x axis
//   if (res.x<0)
//      console.log("x axis : left side !");
//   else
//      console.log("x axis : right side !");
// }
// else if (res.y != 0)
// {
//    // y axis
//    if (res.y<0)
//       console.log("y axis : top side !");
//    else
//       console.log("y axis : bottom side !");

//    // display the tile type
//    console.log(res.yprop.type);
// }

// // check player status after collision check
// var updated = (this.vel.x!==0 || this.vel.y!==0);

        if (this.vel.x !== 0 || this.vel.y !== 0) {
            this.parent(dt);
            // debugger;
            return true;
        }
        return false;
    }
});
