"use strict";

/**
 * Funktion initialisiert das Spielfeld, das Objekt für die Hintergrundmusik und das Spiel an sich.
 */
function init() {
	try {
		console.log('init');
		var style = getComputedStyle(document.body);

		initMusic();
		loadmenu('./menu.html');
		htmlloader = new HTMLLoader("./");
		var canvasElement = document.getElementById('content');

		var context = canvasElement.getContext('2d');
		var canvasmodel = new CanvasModel(canvasElement.getAttribute('width'), canvasElement.getAttribute('height'));
		var canvasview = new CanvasView(canvasmodel, context);
		canvasmodel.attachObserver(canvasview);

		var paddlemodel = new PaddleModel(15, 190, 5, 100, style.getPropertyValue('--canvas-paddle-color'));
		var paddleview = new PaddleView(paddlemodel, context);
		paddlemodel.attachObserver(paddleview);
		canvasmodel.courtElemente.push(paddlemodel);

		var paddlemodel2 = new PaddleModel(625, 190, 5, 100, style.getPropertyValue('--canvas-paddle-color'));
		var paddleview2 = new PaddleView(paddlemodel2, context);
		paddlemodel2.attachObserver(paddleview2);
		canvasmodel.courtElemente.push(paddlemodel2);

		var netmodel = new NetModel(style.getPropertyValue('--canvas-paddle-color'), [15, 15], 4);
		var netview = new NetView(netmodel, context);
		netmodel.attachObserver(netview);
		canvasmodel.courtElemente.push(netmodel);

		var scoremodel = new ScoreModel(160, 120, style.getPropertyValue('--canvas-score-color'), style.getPropertyValue('--canvas-score-font'));
		var scoreview = new ScoreView(scoremodel, context);
		scoremodel.score = 0;
		scoremodel.attachObserver(scoreview);
		canvasmodel.courtElemente.push(scoremodel);

		var scoremodel2 = new ScoreModel(480, 120, style.getPropertyValue('--canvas-score-color'), style.getPropertyValue('--canvas-score-font'));
		var scoreview2 = new ScoreView(scoremodel2, context);
		scoremodel2.score = 0;
		scoremodel2.attachObserver(scoreview2);
		canvasmodel.courtElemente.push(scoremodel2);

		var ballmodel = new BallModel(315, 240, style.getPropertyValue('--canvas-ball-color'), 7);
		var ballview = new BallView(ballmodel, context);
		ballmodel.attachObserver(ballview);
		canvasmodel.courtElemente.push(ballmodel);

		var textmodel = new TextModel(320, 240, "yellow", style.getPropertyValue('--canvas-font'), "\u25B6");
		var textView = new TextView(textmodel, context);
		textmodel.attachObserver(textView);
		canvasmodel.courtElemente.push(textmodel);

		canvasmodel.notifyObservers();

		new CourtController(canvasmodel, paddlemodel, paddlemodel2, ballmodel, context, scoremodel, scoremodel2, textmodel, canvasElement);
		
	} catch (e) {
		console.log(e);
		document.body.innerHTML = '';
		var error = document.createElement('div');
		error.setAttribute("class", "error");
		error.innerHTML = e.message;
		document.body.appendChild(error);
	}
	
}

