$( document ).ready(function(){
    $(".button-collapse").sideNav({
    	menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
	});

	$('.parallax').parallax();
	$("#logo").fadeIn(2000);
	
	setTimeout(function() {
		$('.fecharAut').fadeOut('slow');
	}, 3000);
})

function movimento(para, recuo) {
	$('html,body').animate(
	{scrollTop: $("#"+para).offset().top-recuo}
	, 500);	 
}

/* ALUNO JS */
function mostrarAluno(nome, classe, codigo){
	$('#modal #namestudent').html(nome);
    $('#modal').openModal();
    drawChart(classe);
}

function mostrarNovoAluno(){
	$('#modal-fields #namestudent').html('New Student');
    $('#modal-fields').openModal();
}

function mostrarEditarAluno(nome, codigoProfessor, codigoAluno){
	$('#modal-fields-edit #namestudent').html(nome);
    $('#modal-fields-edit').openModal();
}

function removerAluno(codigo){
	var rem = $('td i#rem-'+codigo).html();
	if(rem == 'delete'){
		$('td i#rem-'+codigo).html('done');
	}else if(rem == 'done'){
		alert("Removido!");
		// removerInstituicaoConfirm(codigo);
		location.reload();
	}
}

/* INSTITUICAO JS */
function mostrarInstituicao(nome, licenca, codigo){
	$('#modal #namebusiness').html(nome +' - '+ licenca);
    $('#modal').openModal();
    drawChart(codigo);
}

function mostrarNovaInstituicao(){
	$('#modal-fields #namebusiness').html('New Client');
    $('#modal-fields').openModal();
}

function mostrarEditarInstituicao(nome, codigo, action){
	$('#modal-fields-edit #namebusiness').html(nome);
	$("#form-callback").html("loading");
	$('#modal-fields-edit').openModal();
	
	$.post(action, {cod: codigo}, function(data) {
		$("#form-callback").html(data);
	}).fail(function() {
		$("#form-callback").html("error");
	});
}

function removerInstituicao(codigo, action){
	var rem = $('td i#rem-'+codigo).html();
	if(rem == 'delete'){
		$('td i#rem-'+codigo).html('done');
	}else if(rem == 'done'){
		$.post(action, {cod: codigo}, function() {
		}).fail(function() {});
		window.location.reload(true);
	}
}

/* PROFESSOR JS */
function mostrarProfessor(nome, codigo){
	$('#modal #nameteacher').html(nome);
    $('#modal').openModal();
}

function mostrarNovoProfessor(action){
	$('#modal-fields #nameteacher').html('New Teacher');
	$('#modal-fields #form-fields').attr('action', action);
    $('#modal-fields').openModal();
}

function mostrarEditarProfessor(nome, codigo, action){
	$('#modal-fields-edit #nameteacher').html(nome);
	$('#modal-fields-edit #form-fields').attr('action', action);
    $('#modal-fields-edit').openModal();
}

function removerProfessor(codigo){
	var rem = $('td i#rem-'+codigo).html();
	if(rem == 'delete'){
		$('td i#rem-'+codigo).html('done');
	}else if(rem == 'done'){
		alert("Removido!");
		// removerInstituicaoConfirm(codigo);
		location.reload();
	}
}

/* QUESTAO JS */
function mostrarQuestao(codigo){
	$('#modal #namequestion').html();
    $('#modal').openModal();
    drawChart(codigo);
}

function mostrarNovaQuestao(){
	$('#modal-fields #namequestion').html('New Question');
    $('#modal-fields').openModal();
}

function mostrarEditarQuestao(codigo){
	$('#modal-fields-edit #namequestion').html();
    $('#modal-fields-edit').openModal();
}

function removerQuestao(codigo){
	var rem = $('td i#rem-'+codigo).html();
	if(rem == 'delete'){
		$('td i#rem-'+codigo).html('done');
	}else if(rem == 'done'){
		alert("Removido!");
		// removerInstituicaoConfirm(codigo);
		location.reload();
	}
}