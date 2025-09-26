//=== UNIDAD III: JQUERY ===

// jQuery 
$(document).ready(function() {
    console.log(' jQuery cargado correctamente');
    
    // Navegación suave
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        if (target) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 70
            }, 800);
        }
    });
    
    // Efectos en las cards
    setTimeout(function() {
        $('.jugador-card').each(function(index) {
            $(this).hide().delay(index * 100).fadeIn(600);
        });
    }, 1000);
    
    // Formulario de contacto
    $('#formContacto').on('submit', function(e) {
        e.preventDefault();
        
        const nombre = $('#nombre').val();
        const email = $('#email').val();
        
        if (!nombre || !email) {
            // Efecto shake
            $('.form-control').effect('shake');
            $('<div class="alert alert-danger mt-3">Por favor, completa todos los campos</div>')
                .insertBefore('#formContacto')
                .delay(3000)
                .fadeOut();
            return;
        }
        
        // Simular envío
        const btn = $(this).find('button');
        const originalText = btn.html();
        btn.html('<i class="bi bi-hourglass-split"></i> Enviando...').prop('disabled', true);
        
        setTimeout(function() {
            $('#formContacto').fadeOut(400, function() {
                $('<div class="alert alert-success mt-3">¡Gracias por tu sugerencia!</div>')
                    .insertBefore('#formContacto')
                    .delay(3000)
                    .fadeOut();
                $(this).trigger('reset').fadeIn(400);
            });
            btn.html(originalText).prop('disabled', false);
        }, 2000);
    });
    
    console.log(' jQuery configurado correctamente');
});