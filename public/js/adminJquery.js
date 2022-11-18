
//#region Especialidad

$(document).ready(function () {
    $("#list-especialidades").on('click', function () {
        $.ajax({
            //type: "method",
            url: "/getEspecialidades",
            //data: "data",
            //dataType: "dataType",
            success: function (response) {
                $("#data").html("");
                $("#add").html("");
                response.forEach(element => {
                    $("#data").append(`<div class="col-8">
                        <ul>
                            <li>
                                <a href="/getEspecialidad/${element.id_especialidad}" class="text-decoration-none text-dark">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title text-uppercase text-start">
                                                ${element.nombre_es}
                                            </h5>
                                            <p class="card-text">${element.descripcion_es}</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>`);
                });
                $("#add").append('<a href="/createEspecialidad"><i class="bi bi-plus-circle-fill">Agregar especialidad</i></a>') 
            }
        });
    })
})

//#endregion

//#region Doctor

$(document).ready(function () {
    $("#list-medicos").on('click', function () {
        $.ajax({
            //type: "method",
            url: "/getDoctores",
            //data: "data",
            //dataType: "dataType",
            success: function (response) {
                $("#data").html("");
                $("#add").html("");
                response.forEach(element => {
                    $("#data").append(`<div class="col-8">
                    <ul>
                        <li>
                            <a href="/getDoctor/${element.id_solicitud}" class="text-decoration-none text-dark">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title text-uppercase text-start">
                                            ${element.nombre} ${element.apellido}
                                        </h5>
                                        <p class="card-text">
                                            Ha solicitado su registro como doctor especialista en
                                            ${element.especialidad}.
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

//#region Reclamaciones

$(document).ready(function () {
    $("#list-reclamos").on('click', function () {
        $.ajax({
            //type: "method",
            url: "/getReclamaciones",
            //data: "data",
            //dataType: "dataType",
            success: function (response) {
                $("#data").html("");
                $("#add").html("");
                response.forEach(element => {
                    $("#data").append(`<div class="col-8">
                    <ul>
                        <li>
                            <a href="/getReclamacion/${element.id_reclamacion}" class="text-decoration-none text-dark">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title text-uppercase text-start">
                                            ${element.titulo_re}
                                        </h5>
                                        <p class="card-text">
                                            Ha solicitado su registro como doctor especialista en
                                            ${element.descripcion_re}.
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