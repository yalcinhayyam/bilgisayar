//JavaScript code to implement booth's algorithm

// function to perform adding in the accumulator
function add(ac, x, qrn)
{
	let c = 0; 
	for (let i = 0; i < qrn; i++)
	{
		// updating accumulator with A = A + BR
		ac[i] = ac[i] + x[i] + c;
		
		if (ac[i] > 1)
		{
			ac[i] = ac[i] % 2;
			c = 1;
		}
		
		else
			c = 0;
	}
}

// function to find the number's complement
function complement(a, n)
{
	let x = new Array(8).fill(0);
	x[0] = 1;
	
	for (let i = 0; i < n; i++)
		a[i] = (a[i] + 1) % 2;
	add(a, x, n);
}


// function to perform right shift
function rightShift(ac, qr, qn, qrn)
{
	let temp = ac[0];
	qn = qr[0];
	
	process.stdout.write("\t\trightShift\t");
	
	for (let i = 0; i < qrn - 1; i++)
	{
		ac[i] = ac[i + 1];
		qr[i] = qr[i + 1];
	}
	
	qr[qrn - 1] = temp;
}


// function to display operations
function display(ac, qr, qrn)
{

	// accumulator content
	for (let i = qrn - 1; i > -1; i--)
		process.stdout.write(ac[i] + "");
	process.stdout.write("\t");

	// multiplier content
	for (i = qrn - 1; i > -1; i--)
		process.stdout.write(qr[i] + "");
}


// Function to implement booth's algo
function boothAlgorithm(br, qr, mt, qrn, sc)
{
	let qn = 0;
	let ac = new Array(10).fill(0);
	let temp = 0;
	process.stdout.write("qn\tq[n+1]\t\tBR\t\tAC\tQR\t\tsc\n");
	process.stdout.write("\t\t\tinitial\t\t");
	
	display(ac, qr, qrn);
	process.stdout.write("\t\t" + sc + "\n");
	
	while (sc != 0)
	{
		process.stdout.write(qr[0] + "\t" + qn);
		
		// SECOND CONDITION
		if ((qn + qr[0]) == 1)
		{
			if (temp == 0)
			{
				// subtract BR from accumulator
				add(ac, mt, qrn);
				process.stdout.write("\t\tA = A - BR\t");
				
				for (let i = qrn - 1; i > -1; i--)
					process.stdout.write(ac[i] + "");

				temp = 1;
			}
			
			// THIRD CONDITION
			else if (temp == 1)
			{
				// add BR to accumulator
				add(ac, br, qrn);
				process.stdout.write("\t\tA = A + BR\t");
				
				for (i = qrn - 1; i > -1; i--)
					process.stdout.write(ac[i] + "");
				temp = 0;
			}
			
			process.stdout.write("\n\t");
			rightShift(ac, qr, qn, qrn);
		}
		
		// FIRST CONDITION
		else if (qn - qr[0] == 0)
			rightShift(ac, qr, qn, qrn);
		
		display(ac, qr, qrn);
		
		process.stdout.write("\t");
		
		// decrement counter
		sc -= 1;
		process.stdout.write("\t" + sc + "\n");
	}
}


// driver code
let mt = new Array(10).fill(0); 
	
// Number of multiplicand bit
let brn = 4;
	
// multiplicand
let br = [ 0, 1, 1, 0 ];
	
// copy multiplier to temp array mt[]
for (let i = brn - 1; i > -1; i--)
		mt[i] = br[i];
	
br.reverse()

complement(mt, brn)

// No. of multiplier bit
qrn = 4;
	
// sequence counter
let sc = qrn;
	
// multiplier
let qr = [ 1, 0, 1, 0 ];
qr.reverse();

boothAlgorithm(br, qr, mt, qrn, sc)
	
console.log("\nResult = ");

for (let i = qrn - 1; i > -1; i--)
	console.log(qr[i] + "");

console.log("\n");
		

//This code is contributed by phasing17
