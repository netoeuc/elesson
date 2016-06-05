$( document ).ready(function(){
    $(".button-collapse").sideNav({
    	menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
	});

	$('.parallax').parallax();
//	$("#logo").fadeIn(2000);
	
	setTimeout(function() {
		$('.fecharAut').fadeOut('slow');
	}, 3000);
})

function movimento(para, recuo) {
	$('html,body').animate(
	{scrollTop: $("#"+para).offset().top-recuo}
	, 500);	 
}

function gerarMascaras(){
	jQuery(function($){
		$.mask.definitions['~']='[+-]';
		//Inicio Mascara Telefone
		$('#phone').focusout(function(){
			var phone, element;
			element = $(this);
			element.unmask();
			phone = element.val().replace(/\D/g, '');
			if(phone.length > 10) {
				element.mask("(99) 99999-999?9");
			} else {
				element.mask("(99) 9999-9999?9");
			}
		}).trigger('focusout');
		//Fim Mascara Telefone
		$("#cnpj").mask("99.999.999/9999-99");
		$("#cpf").mask("999.999.999-99");
		$("#rg").mask("99.999.999-*");
	});
}

/* ALUNO JS */
function mostrarAluno(nome, codigo, action){   
	$("#sidenav-overlay").css("display", "block");
	
	$('#modal #namestudent').html(nome);
	
	$.post(action, {cod: codigo}, function(data) {
		$("#modal #data-callback").html(data);
	}).fail(function() {
		$("#modal #data-callback").html("Something wrong happened. Try again later.");
	}).always(function(){
		$("#sidenav-overlay").css("display", "none");
		$('#modal').openModal();
	});
}

function mostrarNovoAluno(){
	$('#modal-fields #namestudent').html('New Student');
    $('#modal-fields').openModal();
}

function mostrarEditarAluno(nome, codigoProfessor, codigoAluno, action){
	$("#sidenav-overlay").css("display", "block");
	
	$('#modal-fields-edit #namestudent').html(nome);
	
	$.post(action, {codA: codigoAluno, codP: codigoProfessor}, function(data) {
		$("#modal-fields-edit #form-callback").html(data);
	}).fail(function() {
		$("#modal-fields-edit #form-callback").html("Something wrong happened. Try again later.");
	}).always(function(){
		$("#sidenav-overlay").css("display", "none");
		$('#modal-fields-edit').openModal();
	});
}

function removerAluno(codigo,action){
	var rem = $('td i#rem-'+codigo);
	if(rem.attr("rel") == "delete"){
		rem.attr("rel", "done");
		rem.attr("title", "Click to confirm removal");
		rem.attr("class", "tiny-small fa fa-check color-vermelho cursor-pointer");
	}else if(rem.attr("rel") == "done"){
		if (confirm('All data from this student will be remove. Do you want to continue?')) {
			window.location.href = action+"?cod="+codigo;
		}
	}
}

/* INSTITUICAO JS */
function mostrarInstituicao(nome, codigo, action){ 
	$("#sidenav-overlay").css("display", "block");

	$('#modal #namebusiness').html(nome);
	
	$.post(action, {cod: codigo}, function(data) {
		$("#modal #data-callback").html(data);
	}).fail(function() {
		$("#modal #data-callback").html("Something wrong happened. Try again later.");
	}).always(function(){
		$("#sidenav-overlay").css("display", "none");
		$('#modal').openModal();
	});
}

function mostrarNovaInstituicao(){
	$('#modal-fields #namebusiness').html('New Client');
    $('#modal-fields').openModal();
}

function mostrarEditarInstituicao(nome, codigo, action){
	$("#sidenav-overlay").css("display", "block");
	
	$('#modal-fields-edit #namebusiness').html(nome);
	
	$.post(action, {cod: codigo}, function(data) {
		$("#modal-fields-edit #form-callback").html(data);
		gerarMascaras();
	}).fail(function() {
		$("#modal-fields-edit #form-callback").html("Something wrong happened. Try again later.");
	}).always(function(){
		$("#sidenav-overlay").css("display", "none");
		$('#modal-fields-edit').openModal();
	});
	
}

function removerInstituicao(codigo, action){
	var rem = $('td i#rem-'+codigo);
	if(rem.attr("rel") == "delete"){
		rem.attr("rel", "done");
		rem.attr("title", "Click to confirm removal");
		rem.attr("class", "tiny-small fa fa-check color-vermelho cursor-pointer");
	}else if(rem.attr("rel") == "done"){
		if (confirm('All data from this client will be removed. Do you want to continue?')) {
			window.location.href = action+"?cod="+codigo;
		}
	}
}

function editarProfessorAlunos(codigo, action){
	var select = $('#select-'+codigo+' #dropdown-teacher-list option:selected');
	if(select != "null"){
		if (confirm('All answers from this student will be removed. Do you want to continue?')) {
			$.post(action, {codP: codigo, codNP:select.val()}, function() {
			}).fail(function() {});
			window.location.reload(true);
		}
	}	
}

/* PROFESSOR JS */
function mostrarProfessor(nome, codigo, action){
	
	$("#sidenav-overlay").css("display", "block");
	
	$('#modal #nameteacher').html(nome);
	
	$.post(action, {cod: codigo}, function(data) {
		$("#modal #data-callback").html(data);
	}).fail(function() {
		$("#modal #data-callback").html("Something wrong happened. Try again later.");
	}).always(function(){
		$("#sidenav-overlay").css("display", "none");
		$('#modal').openModal();
	});
}

function mostrarNovoProfessor(action){
	$('#modal-fields #nameteacher').html('New Teacher');
	$('#modal-fields #form-fields').attr('action', action);
    $('#modal-fields').openModal();
}

function mostrarEditarProfessor(nome, codigo, action){
	$("#sidenav-overlay").css("display", "block");
	
	$('#modal-fields-edit #nameteacher').html(nome);
	
	$.post(action, {cod: codigo}, function(data) {
		$("#modal-fields-edit #form-callback").html(data);
	}).fail(function() {
		$("#modal-fields-edit #form-callback").html("Something wrong happened. Try again later.");
	}).always(function(){
		$("#sidenav-overlay").css("display", "none");
		$('#modal-fields-edit').openModal();
	});
}

function removerProfessor(codigo,action){
	var rem = $('td i#rem-'+codigo);
	if(rem.attr("rel") == "delete"){
		rem.attr("rel", "done");
		rem.attr("title", "Click to confirm removal");
		rem.attr("class", "tiny-small fa fa-check color-vermelho cursor-pointer");
	}else if(rem.attr("rel") == "done"){
		if (confirm('All questions and students linked will be removed. Do you want to continue?')) {
			window.location.href = action+"?cod="+codigo;
		}
	}
}

/* QUESTAO JS */
function mostrarQuestao(codigo, action){
	$("#sidenav-overlay").css("display", "block");
		
	$.post(action, {cod: codigo}, function(data) {
		$("#modal #data-callback").html(data);
	}).fail(function() {
		$("#modal #data-callback").html("Something wrong happened. Try again later.");
	}).always(function(){
		$("#sidenav-overlay").css("display", "none");
		$('#modal').openModal();
	});
}

function mostrarNovaQuestao(){
	$('#modal-fields #namequestion').html('New Question');
    $('#modal-fields').openModal();
}

function mostrarEditarQuestao(codigo, action){
	$("#sidenav-overlay").css("display", "block");
	
	$.post(action, {cod: codigo}, function(data) {
		$("#modal-fields-edit #form-callback").html(data);
	}).fail(function() {
		$("#modal-fields-edit #form-callback").html("Something wrong happened. Try again later.");
	}).always(function(){
		$("#sidenav-overlay").css("display", "none");
		$('#modal-fields-edit').openModal();
	});
}

function removerQuestao(codigo,action){
	var rem = $('td i#rem-'+codigo);
	if(rem.attr("rel") == "delete"){
		rem.attr("rel", "done");
		rem.attr("title", "Click to confirm removal");
		rem.attr("class", "tiny-small fa fa-check color-vermelho cursor-pointer");
	}else if(rem.attr("rel") == "done"){
		if (confirm('All answers from students will be remove. Do you want to continue?')) {
			window.location.href = action+"?cod="+codigo;
		}
	}
}