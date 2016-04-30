$( document ).ready(function(){
    $(".button-collapse").sideNav({
    	menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
	});

	$('.parallax').parallax();
	$("#logo").fadeIn(2000);
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
	$('#modal-fields #namestudent').html(nome);
    $('#modal-fields').openModal();
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

function mostrarEditarInstituicao(nome, licenca, codigo){
	$('#modal-fields #namebusiness').html(nome);
    $('#modal-fields').openModal();
}

function removerInstituicao(codigo){
	var rem = $('td i#rem-'+codigo).html();
	if(rem == 'delete'){
		$('td i#rem-'+codigo).html('done');
	}else if(rem == 'done'){
		alert("Removido!");
		// removerInstituicaoConfirm(codigo);
		location.reload();
	}
}

/* PROFESSOR JS */
function mostrarProfessor(nome, codigo){
	$('#modal #nameteacher').html(nome);
    $('#modal').openModal();
}

function mostrarNovoProfessor(){
	$('#modal-fields #nameteacher').html('New Teacher');
    $('#modal-fields').openModal();
}

function mostrarEditarProfessor(nome, codigo){
	$('#modal-fields #nameteacher').html(nome);
    $('#modal-fields').openModal();
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