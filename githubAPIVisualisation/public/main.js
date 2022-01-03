function getProfile() {
//Token receieved from access token query
	const query = window.location.search.substring(1);
	const token = query.split('access_token=')[1];

	// Retrieve user info from github api from fetch library
	fetch('//api.github.com/user', {
		headers: {
			// Token specific for each authorization 
			Authorization: 'token ' + token
		}
	})
		//Authorization response changed to json type
		.then((res) => res.json())
		
}

function weekCommitsGraph(user, repo, graphID) {
	var margin = { top: 60, right: 60, bottom: 60, left: 60 },
		width = 580 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	//place the graph onto the page
	var svg = d3
		.select('#' + graphID)
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	//Data read in
	d3.json('//api.github.com/repos/' + user + '/' + repo + '/stats/commit_activity', function(data) {
		//X axis
		var x = d3
			.scaleLinear()
			.domain([
				0,
				52
			])
			.range([
				0,
				width
			]);
		svg.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x));

		//X axis label:
		svg.append('text').attr('text-anchor', 'end').attr('x', width).attr('y', height + 50).text('Week of Year');

		var maxCommits = 0;
		d3.extent(data, function(d) {
			if (d.total > maxCommits) maxCommits = d.total;
		});
		//Y axis
		var y = d3
			.scaleLinear()
			.domain([
				0,
				maxCommits
			])
			.range([
				height,
				0
			]);
		svg.append('g').call(d3.axisLeft(y));

		//Y axis label:
		svg
			.append('text')
			.attr('text-anchor', 'end')
			.attr('x', 0)
			.attr('y', -20)
			.text('Number of Commits')
			.attr('text-anchor', 'start');

		//Line between points addition
		var week = 0;
		svg.append('path').datum(data).attr('fill', 'none').attr('stroke', '#040273').attr('stroke-width', 1.5).attr(
			'd',
			d3
				.line()
				.x(function(d) {
					return x(week++);
				})
				.y(function(d) {
					return y(d.total);
				})
		);
		//Points added to graph
		week = 0;
		svg
			.append('g')
			.selectAll('dot')
			.data(data)
			.enter()
			.append('circle')
			.attr('cx', function(d) {
				return x(week++);
			})
			.attr('cy', function(d) {
				return y(d.total);
			})
			.attr('r', 3)
			.attr('fill', '#040273');

		//Title creation for graph
		//Add title to graph
		var titleNode = document.createElement('div');
		titleNode.id = graphID + '_title';
		titleNode.textContent = repo + ' -> Weekly Commits';
		titleNode.style = 'font-size: 28px; padding: 5px; margin: 2px;';
		document.getElementById(graphID).prepend(titleNode);

		//Add subtitle to graph
		var subTitleNode = document.createElement('div');
		subTitleNode.id = graphID + '_subTitle';
		subTitleNode.textContent = user;
		subTitleNode.style = 'font-size: 20px; color: grey; padding: 2px; margin: 2px;';
		document.getElementById(graphID + '_title').append(subTitleNode);
	});
}

function hourGraph(user, repo, graphID) {
	var margin = { top: 60, right: 60, bottom: 60, left: 60 },
		width = 580 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	//place the graph onto the page
	var svg = d3
		.select('#' + graphID)
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	//Data read in
	d3.json('//api.github.com/repos/' + user + '/' + repo + '/stats/punch_card', function(data) {

	//Scaling graph and its axis
		//X axis
		var x = d3
			.scaleLinear()
			.domain([
				0,
				6
			])
			.range([
				0,
				width
			]);
		svg.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x).ticks(7));

		//X axis label:
		svg.append('text').attr('text-anchor', 'end').attr('x', width).attr('y', height + 50).text('Day');

		//Y axis
		var y = d3
			.scaleLinear()
			.domain([
				0,
				23
			])
			.range([
				height,
				0
			]);
		svg.append('g').call(d3.axisLeft(y).ticks(24));

		//Y axis label:
		svg
			.append('text')
			.attr('text-anchor', 'end')
			.attr('x', 0)
			.attr('y', -20)
			.text('Time')
			.attr('text-anchor', 'start');

		//Bubble scale sizes
		var z = d3
			.scaleSqrt()
			.domain([
				0,
				25
			])
			.range([
				0,
				20
			]);

		//Bubble scale sizes
		var myColor = d3
			.scaleSqrt()
			.domain([
				0,
				25
			])
			.range([
				'white',
				'#040273'
			]);

		//Tooltip creation
		//Tooltip creation, default hidden
		var tooltip = d3
			.select('#' + graphID)
			.append('div')
			.style('opacity', 0)
			.attr('class', 'tooltip')
			.style('background-color', 'black')
			.style('border-radius', '5px')
			.style('padding', '10px')
			.style('color', 'white')
			.style('position', 'absolute');

		//Creation of functions x 3, hiding tooltip
		var showTooltip = function(d) {
			tooltip.transition().duration(200);
			tooltip
				.style('opacity', 100)
				.html('Commits: ' + d[2])
				.style('left', d3.select(this).attr('cx') + 'px')
				.style('top', d3.select(this).attr('cy') + 'px');
		};

		var hideTooltip = function(d) {
			tooltip.transition().duration(200).style('opacity', 0);
		};

		//Circles creation for grpah
		//Add specific dots
		svg
			.append('g')
			.selectAll('dot')
			.data(data)
			.enter()
			.append('circle')
			.attr('class', function(d) {
				return 'bubbles ' + d[2];
			})
			.attr('cx', function(d) {
				return x(d[0]);
			})
			.attr('cy', function(d) {
				return y(d[1]);
			})
			.attr('r', function(d) {
				return z(d[2]);
			})
			.style('fill', function(d) {
				return myColor(d[2]);
			})
			//Functions for mouse hovers over cicrlces 
			.on('mouseover', showTooltip)
			.on('mouseleave', hideTooltip);

		//Title creation for graph
		//Add title to graph
		var titleNode = document.createElement('div');
		titleNode.id = graphID + '_title';
		titleNode.textContent = repo + ' -> What time code committed (24hr clock)';
		titleNode.style = 'font-size: 28px; padding: 5px; margin: 2px;';
		document.getElementById(graphID).prepend(titleNode);

		//Add subtitle to graph
		var subTitleNode = document.createElement('div');
		subTitleNode.id = graphID + '_subTitle';
		subTitleNode.textContent = user;
		subTitleNode.style = 'font-size: 20px; color: grey; padding: 2px; margin: 2px;';
		document.getElementById(graphID + '_title').append(subTitleNode);
	});
}
