quick_draw_data_set=["aircraft carrier","airplane","cup"]

random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
console.log(quick_draw_data_set[random_number]);
sketch = quick_draw_data_set[random_number];
document.getElementById('sketch_name').innerHTML = 'Sketch To be Drawn: ' + sketch;

timer_counter = 0;
timer_check = "";
drawn_sketch = ""; 
answer_holder = "";
score = 0;

function updateCanvas() {
    background("White");
    random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
console.log(quick_draw_data_set[random_number]);
sketch = quick_draw_data_set[random_number];
document.getElementById('sketch_name').innerHTML = 'Sketch To be Drawn: ' + sketch;
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    canvas.mouseReleased(classifyCanvas);
}

function draw() {
    strokeWeight(11);
    stroke(0);

    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

    check_sketch()
    if(drawn_sketch == sketch)
    {
        answer_holder = "set"
        score++;
        document.getElementById('score').innerHTML = 'Score: ' + score;
    }

    
}

function classifyCanvas() {
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';
    
    document.getElementById('label').innerHTML = 'your Sketch: ' + drawn_sketch;
}

function check_sketch()
{
    timer_counter++;
    document.getElementById('time').innerHTML = 'Timer: ' + timer_counter;
    if(timer_counter > 3000)
    {
        timer_counter = 0;
        timer_check = "completed"
    }
    if(timer_check =="completed" || answer_holder == "set")
    {
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}