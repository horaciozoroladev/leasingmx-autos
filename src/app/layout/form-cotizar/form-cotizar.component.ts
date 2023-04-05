import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICotizacion } from 'src/app/interfaces/cotizacion.interface';
import { IDistribuidores, IDistribuidoresData } from 'src/app/interfaces/distribuidores.interface';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { DistribuidoresService } from 'src/app/services/distribuidores.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-cotizar',
  templateUrl: './form-cotizar.component.html',
  styleUrls: ['./form-cotizar.component.scss']
})
export class FormCotizarComponent implements OnInit {

  imagenes = environment.imagenes;

  distribuidores: IDistribuidores = {
    distribuidores: []
  }

  distribuidoresData: IDistribuidoresData[] = []

  cotizarForm: FormGroup;

  isCotizacionOk = false;
  sendingCotizacion = false;

  constructor(
    private formBuilder: FormBuilder,
    private distribuidoresService: DistribuidoresService,
    private cotizacionService: CotizacionService,
  ) {
    this.cotizarForm = this.createForm();
  }

  ngOnInit(): void {
    const s$ = this.distribuidoresService.distribuidores_get().subscribe((data: IDistribuidores) => {
      if (data != null) {
        // this.distribuidores = data;
        this.distribuidoresData = [{ id: '0', name: 'Seleccionar' }, ...data.distribuidores];
      }
      s$.unsubscribe();
    });
  }

  createForm(cotizacion?: ICotizacion): FormGroup {
    return this.formBuilder.group({
      idDistribuidor: [cotizacion?.idDistribuidor ?? 0, Validators.required],
      paginaAuto: [cotizacion?.paginaAuto ?? '', Validators.required],
      nombreCompleto: [cotizacion?.nombreCompleto ?? '', Validators.required],
      email: [cotizacion?.email ?? '', Validators.required],
    })
  }

  cotizar(): void {
    if (this.cotizarForm.valid) {
      this.sendingCotizacion = true;

      setTimeout(() => {

        this.cotizacionService.cotizacion_post(this.cotizarForm.value).subscribe((data: HttpResponse<any>) => {
          if (data.statusText.includes('ok')) {
            this.isCotizacionOk = true;
          }
          this.sendingCotizacion = false;
        },
        (error: HttpErrorResponse) => {
          console.log(error)
          if (error.status == 200 && error.statusText.includes('OK')) {
            this.isCotizacionOk = true;
          }
          this.sendingCotizacion = false;
        })
      }, 1000);
    }
  }

  regresar(): void {
    this.cotizarForm = this.createForm();
    this.isCotizacionOk = false;
    this.sendingCotizacion = false;
  }

}
