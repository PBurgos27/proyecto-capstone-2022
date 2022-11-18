/* $(document).ready(function () {
    $("#citas").click(function () {
        $("#contenedor-principal-citas-paciente").html("")
        $("#contenedor-principal-citas-paciente").append(
            `<div id="contenedor-citas-y-del-paciente">
            <div class="container">
                <div>
                    <a id="citas-publicadas" href="#" class="btn">
                      Citas
                    </a>
                    <a id="mis-citas" class="btn">
                      Mis Citas
                    </a>
                    <div id="lista-citas" class="">
                    </div>
                  </div>
            </div>
        </div>
      </div>`
        )
    })
}) */

//TODO: muestra lista de citas por especialidades
$(document).ready(function(){
    $('#list-especialidades').click(function(){
        $.ajax({
            //type: "method",
            url: "/getEspecialidades",
            //data: "data",
            //dataType: "dataType",
            success: function (response) {
                $("#data").html("");
                $("#doc").html("");
                response.forEach(element => {
                    $("#data").append(`<div class="col-8">
                    <ul>
                        <li>
                            <a href="/getDoctor/${element.id_solicitud}" class="text-decoration-none text-dark">
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
            }
        });
    })
})
/* 
$(document).ready(function () {
    $('#cita-item').click(function(){
        $('#contiene-cita-seleccionada').html("")
        $('#contiene-cita-seleccionada').append(
            `<div class="card">
            <h5>Dr. Pepito Chávez </h5>
            <div class="card-body">
              <div class="float-start">
                <p>Fecha: 12/22/22</p>
                <p>Ubicación: Av.Las Cucas </p>
                <p>Descripción: no hay descripción</p>
              </div>
              <p>
                  <b>Cupos: 25</b>
                </p>
              <button class="btn btn-primary">Reservar</button>
              <br />
              <br />
            </div>
          </div>`
        )
    })
})


//TODO:muestra el contendor de las citas de citas y mis citas
$(document).ready(function () {
    $("#citas-publicadas").on('click',function () {
        $("#lista-citas").append(
            `<div id="lista-de-seleccionada-el-contenedor">
            <div className="row">
              <div className="row">
                <div className="col">
                  <ul>
                    <li>
                      <a id="cita1" href="#" class="text-decoration-none text-dark">
                        <div class="card">
                          <div class="card-title">
                            <div class="row">
                              <h5 class="col">Pepito Chávez</h5>
                              <span class="col">cupos: 25</span>
                            </div>
                          </div>
                          <div class="card-body">
                            <div>
                              <p>Especialidad: Nutricionista</p>
                              <span>Fecha y hora: 22/22/22</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
    
                    <li>
                      <a id="cita2" href="#" class="text-decoration-none text-dark">
                        <div class="card">
                          <div class="card-title">
                            <div class="row">
                              <h5 class="col">Pepito Chávez</h5>
                              <span class="col">cupos: 25</span>
                            </div>
                          </div>
                          <div class="card-body">
                            <div>
                              <p>Especialidad: Nutricionista</p>
                              <span>Fecha y hora: 22/22/22</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div id="cita-seleccionada" class="col">mostrar aquí</div>
              </div>
            </div>
          </div>`
        )
    })
})
 */