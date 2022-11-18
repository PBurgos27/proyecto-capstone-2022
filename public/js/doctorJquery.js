//#region Citas

$(document).ready(function(){
    $("#list-citas").on('click',function(){
        $.ajax({
            //type: "method",
            url: "/getCitas",
            //data: "data",
            //dataType: "dataType",
            success: function (response) {
                $("#data").html("");
                $("#add").html("");
                response.forEach(element => {
                    $("#data").append(`<div class="col-8">
                    <ul>
                        <li>
                            <a href="/getCita/${element.id_cita}" class="text-decoration-none text-dark">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title text-uppercase text-start">
                                            ${element.tipo}
                                        </h5>
                                        <p class="card-text">
                                            Ha solicitado su registro como doctor especialista en
                                            ${element.descripcion_ci}.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>`);
                });
            }
        });
    })
})

//#endregion