$( document ).ready(function(){
    $(".button-collapse").sideNav({
    	menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
	});

	$('.parallax').parallax();
	$("#logo").fadeIn(2000);
})

function mostrarAluno(nome, classe, codigo){
	$('#modal #namestudent').html(nome);
    $('#modal').openModal();
    drawChart(classe);
}

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

function movimento(para, recuo) {
	$('html,body').animate(
	{scrollTop: $("#"+para).offset().top-recuo}
	, 500);	 
}