
import java.awt.Color;
import java.awt.Graphics;

class Disk extends Point {
	protected int radius;
	public Vect velocity;
	public Color borderColor;
	public boolean anchored = false; // default value

	public Disk(int x, int y, int radius, Color color) {
		this(x, y, radius, color, color);
		// you write: call constructor with (int, int, int, Color, Color). The last two params are just color
	}
	
	public Disk(int radius, Color color) {
		super();
		init(radius, color, color);
		// you write: call the default Point constructor
		// you write: call init
		
	}
	
    Disk(int x, int y, int radius, Vect velocity, Color c) {
		this(x, y, radius, c);
		this.velocity = velocity;
		// you write: call the four parameter constructor.
		// you write: set the velocity
	}
	
	
	public Disk(int x, int y, int radius, Color color, Color borderColor) {
		super(x, y);
		init(radius, color, borderColor);
		// you write: call the Point 2-parameter constructor
		// you write: call init
	}
	
	private void init(int radius, Color color, Color borderColor) {
		this.velocity = new Vect(0, 0);
		this.color = color;
		this.borderColor = borderColor;
		this.radius = radius;
		// you write: initialize values, set velocity to zero.
	}
	
	void copyDisk(Disk d) {
		x = d.x;
		y = d.y;
		velocity = d.velocity;
		color = d.color;
		borderColor = d.borderColor;
		radius = d.radius;
		anchored = d.anchored;
		// you write: set all values of this to d’s values.
	}
	
	public Disk(Disk[] otherDisks) // create a random anchored disk, avoiding overlaps with other disks.
	{
		// Nothing to do here but understand how it works.
		boolean collision;
		Disk temp;
		anchored = true;
		int tries, maxTries = 10000, minRadius = 40;
		do {
			tries = 0;
			do { 
				temp = new Disk(
						Util.getRandom(minX, maxX), 
						Util.getRandom(minY,maxY), 
						Util.getRandom(minRadius, minRadius + (maxX - minX)/9),
						Util.getDarkColor()	,
						Color.LIGHT_GRAY);
				temp.anchored = true;
				
				collision = false;
				for (int j = 0; j < otherDisks.length; j++)  {
					Disk other = otherDisks[j];
					if (other != null && other.collision(temp)) 
						collision = true;
				}
				tries++;
			} while (collision && tries < maxTries);
			minRadius--;
			//if (minRadius < 40) System.out.println(minRadius);
		} while (collision && minRadius >= 1);
		
		copyDisk(temp);
		
	}
	public boolean collision(Disk d) {
		double r = getDistance(d);
		return r <= radius + d.radius  &&  d != this; 
	}
	
	public void draw(Graphics g, Color c, Color border) {
		// everything in here is written for you but you should understand how it works.
		Color temp = g.getColor();  // save color
		g.setColor(c); // temporarily change color
		int d = Util.round(2 * radius);
		g.fillOval(Util.round(x - radius), Util.round(y - radius), d,d);
		if (!this.color.equals(border)) {
			g.setColor(border);
			g.drawOval(Util.round(x - radius), Util.round(y - radius), d,d);	
		}
		g.setColor(temp); // restore color
	}
	
	@Override
	public void draw(Graphics g) {
		draw(g, color, borderColor);
		// you write: call the draw above with color and borderColor.
	}
	public void setRadius(int radius) {
		this.radius = radius;
		// you write: set the radius
	}
	
	public double getArea() {
		// you write: get the area
		return Math.PI * Math.pow(radius, 2);
	}

	public void erase(Graphics g) {
		draw(g,background, background);
	}
	public void move() {
		// you write: update  velocity if disk boundary crosses border and is going it that direction
		if ((velocity.vx < 0 && x - radius < 0) || (velocity.vx > 0 && x + radius > maxX))
			velocity.negateX();
		if ((velocity.vy < 0 && y - radius < 0) || (velocity.vy > 0 && y + radius > maxY))
			velocity.negateY();
		move(velocity); // calls Point move
		
	}
	public void move(Disk [] disks) {
		if (anchored) return;

		for (int i = 0; i < disks.length; i++) 
			if (disks[i] != null)
				handleCollision(disks[i]);
		
		double speed = this.velocity.getLength(); 
		if (speed > 6) this.velocity.setLength(speed * 0.99);  // some friction for super fast speeds
		move();
	}
	public void elasticCollision(Disk d) {
		double sx = d.x-x, sy = d.y-y;
		double dot = sx*sx + sy*sy;
		double len = Math.sqrt(dot);

		double ar = radius, br = d.radius;

		if (len == 0 || len > ar + br) return;

		Vect a = velocity, b = d.velocity;

		double ms = ((ar + br) / len - 1) / 2;
		double mx = sx * ms, my = sy * ms;

		x -= mx; 
		y -= mx;
		d.x += mx;
		d.y += my;

		double abm = (ar * ar) / (br * br);
		double ad = (a.vx * sx + a.vy * sy) / dot;
		double bd = (b.vx * sy + b.vy * sy) / dot;

		if (ad > 0) {
			a.vx -= sx * ad; b.vx += sx * ad * abm;
			a.vy -= sy * ad; b.vy += sy * ad * abm;
		}
		if (bd < 0) {
			b.vx -= sx * bd; a.vx += sx * bd / abm;
			b.vy -= sy * bd; a.vy += sy * bd / abm;
		}
	}

	public void handleCollision(Disk d) {
		if (collision(d)) 
			if (!d.anchored) elasticCollision(d);
			else {
				double sx = x-d.x, sy = y-d.y;
				double dot = sx*sx + sy*sy;
				double len = Math.sqrt(dot);

				double ar = radius, br = d.radius;

				if (len == 0 || len > ar + br) return;

				Vect v = velocity;

				x = d.x + sx * (ar + br) / len;
				y = d.y + sy * (ar + br) / len;

				double vd = (v.vx * sx + v.vy * sy) / dot;

				if ( vd < 0) {
					v.vx -= 2 * sx * vd;
					v.vy -= 2 * sy * vd;
				}
			}
	}
	
	@Override
	public String toString() {
		return velocity.toString();
		// you write: call toString of Point then append velocity in square brackets e.g. (44,55)  [0.2,3.22]
		// remember, there is already a Velocity.toString(). 
	}
	
}
