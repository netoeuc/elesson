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

function gerarTextEditor(seletor){
		tinymce.init({
			  selector: seletor,
			  height: 200,
			  plugins: [
			    'preview',
			    'fullscreen',
			    'paste'
			  ],
			  toolbar: 'undo redo'
		});
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

function mostrarEditarAluno(nome, codigoProfessor, codigoAluno, action){
	$('#modal-fields-edit #namestudent').html(nome);
	$("#modal-fields-edit #form-callback").html("loading");
	$('#modal-fields-edit').openModal();
	
	$.post(action, {codA: codigoAluno, codP: codigoProfessor}, function(data) {
		$("#modal-fields-edit #form-callback").html(data);
	}).fail(function() {
		$("#modal-fields-edit #form-callback").html("error");
	});
}

function removerAluno(codigo,action){
	var rem = $('td i#rem-'+codigo);
	if(rem.attr("rel") == "delete"){
		rem.attr("rel", "done");
		rem.attr("class", "tiny-small fa fa-check color-vermelho cursor-pointer");
	}else if(rem.attr("rel") == "done"){
		$.post(action, {cod: codigo}, function() {
		}).fail(function() {});
		window.location.reload(true);
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
	$("#modal-fields-edit #form-callback").html("loading");
	$('#modal-fields-edit').openModal();
	
	$.post(action, {cod: codigo}, function(data) {
		$("#modal-fields-edit #form-callback").html(data);
		gerarMascaras();
	}).fail(function() {
		$("#modal-fields-edit #form-callback").html("error");
	});
}

function removerInstituicao(codigo, action){
	var rem = $('td i#rem-'+codigo);
	if(rem.attr("rel") == "delete"){
		rem.attr("rel", "done");
		rem.attr("class", "tiny-small fa fa-check color-vermelho cursor-pointer");
	}else if(rem.attr("rel") == "done"){
		$.post(action, {cod: codigo}, function() {
		}).fail(function() {});
		window.location.reload(true);
	}
}

/* PROFESSOR JS */
function mostrarProfessor(nome, codigo, action){
	var modal = $('#modal #nameteacher');
	modal.html(nome);

	$("#modal #data-callback").html("loading");
	$('#modal').openModal();
	
	$.post(action, {cod: codigo}, function(data) {
		$("#modal #data-callback").html(data);
	}).fail(function() {
		$("#modal #data-callback").html("error");
	});
	
    $('#modal').openModal();
}

function mostrarNovoProfessor(action){
	$('#modal-fields #nameteacher').html('New Teacher');
	$('#modal-fields #form-fields').attr('action', action);
    $('#modal-fields').openModal();
}

function mostrarEditarProfessor(nome, codigo, action){
	$('#modal-fields-edit #nameteacher').html(nome);
	$("#modal-fields-edit #form-callback").html("loading");
	$('#modal-fields-edit').openModal();
	
	$.post(action, {cod: codigo}, function(data) {
		$("#modal-fields-edit #form-callback").html(data);
	}).fail(function() {
		$("#modal-fields-edit #form-callback").html("error");
	});
}

function removerProfessor(codigo,action){
	var rem = $('td i#rem-'+codigo);
	if(rem.attr("rel") == "delete"){
		rem.attr("rel", "done");
		rem.attr("class", "tiny-small fa fa-check color-vermelho cursor-pointer");
	}else if(rem.attr("rel") == "done"){
		$.post(action, {cod: codigo}, function() {
		}).fail(function() {});
		window.location.reload(true);
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

function mostrarEditarQuestao(codigo, action){
	$("#modal-fields-edit #form-callback").html("loading");
	$('#modal-fields-edit').openModal();
	
	$.post(action, {cod: codigo}, function(data) {
		$("#modal-fields-edit #form-callback").html(data);
		gerarTextEditor("#modal-fields-edit #form-callback #txtEditor-edit");
	}).fail(function() {
		$("#modal-fields-edit #form-callback").html("error");
	});
}

function removerQuestao(codigo,action){
	var rem = $('td i#rem-'+codigo);
	if(rem.attr("rel") == "delete"){
		rem.attr("rel", "done");
		rem.attr("class", "tiny-small fa fa-check color-vermelho cursor-pointer");
	}else if(rem.attr("rel") == "done"){
		$.post(action, {cod: codigo}, function() {
		}).fail(function() {});
		window.location.reload(true);
	}
}