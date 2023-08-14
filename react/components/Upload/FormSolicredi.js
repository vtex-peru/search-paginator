
import conf from './indexc'
import React, { Component, useState, useEffect } from 'react';
import styles from './styles.css';
import iconUpload from './assets/icon_upload.svg'
import iconDownload from './assets/icon_download.svg'
//import formatoSolicre from './doc/FORMATO_SOLICITUD_DE_LINEA_DE_CREDITO_COOLBOX.pdf'



var data = {};
const REG_USER_NAME = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const REG_USER_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
const REG_PHONE = /^[9][0-9]{8}$/;
const REG_RS = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;



// const APPKEY = 'vtexappkey-coolboxpe-ALHLZW'
// const APPTOKEN = 'MOQYXOEHBILVUCDQSZMNZXMUPDKNFVONSJVZOWCCOAUNLENNUJTZRRFLAWNVRDUCGRZDPTUDBNRUKGVRWSEFEYVWPNVYNXYCLEFOLIKZJQIQBHYVSAEUDCNPYMKKODHZ'

var cont = 0;
var disableForm = false;

export default function FormSolicredi() {

  /*   React.useEffect(() => {
        const confettiSettings = { target: 'my-canvas' };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        var conf = document.getElementById('my-canvas');
        conf.style.position = 'absolute';
        conf.style.opacity = '0';
        conf.style.top = '0';
        conf.style.left = '0';
        conf.style.width = '100%';
        conf.style.height = '100%';
        conf.style.zIndex = '-10';
        conf.style.transition = '.6s ease all';
        conf.style.pointerEvents = 'none';
        return () => confetti.clear();
    }, []);  */
    
    // carga el form

    // const [dataSelectShops, setDataSelectShops] = useState([]);

  /*   const [showConfetti, setShowConfetti] = useState({ ready: '' });
    const { ready } = showConfetti;

    React.useEffect(() => {
        var conf = document.getElementById('my-canvas');
        if (cont == 1) {
            conf.style.opacity = '1';
            conf.style.zIndex = '1'
        } else {
            var conf = document.getElementById('my-canvas');
            conf.style.opacity = '0';
            conf.style.zIndex = '-10'
        }
    }, [ready]) */

    const [form, setForm] = useState({
        tipoServicio: '',
        nombre: '',
        celular: '',
        correo: '',
        razonSocial: ''

    });

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const sendData = async (data) => {
        try {
            //const response = await fetch('/api/dataentities/GX/documents', 
            //const response = await fetch('/_v/validate-marketing-form',
            // const response = await fetch('/_v/responde-gana-form',
            // const response = await fetch('/_v/responde-gana-v-form',
            const response = await fetch('/api/dataentities/SC/documents',

                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/vnd.vtex.ds.v10+json',
                        'Content-Type': 'application/json',
                        //'X-VTEX-API-APPKEY': APPKEY,
                        //'X-VTEX-API-APPTOKEN': APPTOKEN,
                    },
                    body: JSON.stringify(data)
                }
            );
            const res = await response.json();
            // console.log('respuesta',res);
            return true;
        } catch (error) {
            console.log('Error de envio', error)
            return false;
        }
    };
    const showError = (e, i = '') => {
        let element = document.getElementById(e);
        element.style.transform = 'translateY(2px)';
        element.style.visibility = 'visible';
        element.style.zIndex = '1';
        if (i != '') {
            let p = document.getElementById(i);
            p.style.border = '1px solid #FF2442';
        }
    }

    const hideError = (e, i = '') => {
        let element = document.getElementById(e);
        // console.log('element: ',element);
        element.style.transform = 'translateY(-17px)';
        element.style.visibility = 'hidden';
        element.style.zIndex = '-1';
        if (i != '') {
            let n = document.getElementById(i);
            n.style.border = '1px solid #EEEDDE';
        }
        return true
    }

    const validateTipoServicio = (tipoServicio) => {
        let resp = tipoServicio !== ''
        if (!resp) {
            showError('errorTipoServicio', 'tipoServicio')
        }
        return resp
    }
    const validateNombre = (nombre) => {
        let resp = nombre !== ''
        if (!resp) {
            showError('errorNombre', 'nombre')
        }
        return resp
    }

    const validateCelular = (p) => {
        let resp = (REG_PHONE.test(p) && p.trim() != '') ? true : false;
        //let resp = celular !== ''
        if (!resp) {
            showError('errorCelular', 'celular')
        }
        return resp
    }
    const validateCorreo = (correo) => {
        let resp = (REG_USER_EMAIL.test(correo) && correo.trim() != '') ? true : false;
        //let resp = correo !== ''
        if (!resp) {
            showError('errorCorreo', 'correo')
        }
        return resp
    }
    //const validateRazonSocial = (razonSocial) => {
        const validateRazonSocial = (p) => {
        let resp = (REG_RS.test(p) && p.trim() != '') ? true : false;
        //let resp = razonSocial !== ''
        if (!resp) {
            showError('errorRazonSocial', 'razonSocial')
        }
        return resp
    }


    const handleSubmit = e => {
        e.preventDefault();
        data = { ...form };

        const respTipoServicio = validateTipoServicio(data.tipoServicio) ? hideError('errorTipoServicio', 'tipoServicio') : null
        const respNombre = validateNombre(data.nombre) ? hideError('errorNombre', 'nombre') : null
        const respCelular = validateCelular(data.celular) ? hideError('errorCelular', 'celular') : null
        const respCorreo = validateCorreo(data.correo) ? hideError('errorCorreo', 'correo') : null
        const respRazonSocial = validateRazonSocial(data.razonSocial) ? hideError('errorRazonSocial', 'razonSocial') : null

        if (respTipoServicio === null || respNombre === null || respCelular === null || respCorreo === null || respRazonSocial === null) {

            console.log("... DATA")
            return
        }
        else {
            console.log("entra")
            var isReady = sendData(data);
            // console.log('isready', isReady);

            isReady.then((e) => {
                // console.log('eee',e);
                if (e) {
                    cont = 1; // mostrando confetti
                    //setShowConfetti({ ready: 'yes' });
                    showPoup();
                    setForm({
                        tipoServicio: '',
                        nombre: '',
                        celular: '',
                        correo: '',
                        razonSocial: '',
                        optionSelect: ''

                    });
                    //setCheckbox('send'); // Limpiando checkbox
                    disablingForm(); // inhabilitando formulario
                }
                else
                    console.log('Error en Master Data');
            });
        }
    };

    const disablingForm = () => {
        disableForm = true;
    }

    const showPoup = () => {
        var p = document.getElementById('poupP');
        p.style.zIndex = '1';
        p.style.opacity = '1';
        // p.style.backgroundColor = '#fafafa';
    }

    return (
        <>
            <div className={styles.containerForm}>
                <div id='poupP' className={styles.poup}>
                    <p className={styles.thanks}>Solicitud ingresada correctamente.</p>
                    <svg width="150" height="166" viewBox="0 0 850 166" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M768.8 162.9H81.2C37 162.9 1 126.8 1 82.7C1 38.6 37 2.5 81.2 2.5H768.9C813 2.5 849.1 38.6 849.1 82.7C849 126.8 812.9 162.9 768.8 162.9Z" fill="#1D1D1B" />
                        <path d="M167.2 108.9C166.5 110.1 165.4 111.2 164.1 111.9L118.7 137.8C116.1 139.3 112.9 139.3 110.3 137.8L65 112C62.4 110.5 60.8 107.8 60.8 104.8V53.1C60.8 51.6 61.2 50.2 61.9 49C62.6 47.8 63.7 46.7 65 46L110.4 20.1C113 18.6 116.2 18.6 118.8 20.1L164.2 46C166.8 47.5 168.4 50.2 168.4 53.2V104.9C168.3 106.3 167.9 107.7 167.2 108.9ZM158.4 106.1C161.3 106.8 162.4 105 160.3 102.9L155.2 97.6C152.9 95.3 152.3 91.1 152.3 88.4V62.2C152.3 59.5 150.4 56.2 148 54.8L118.8 38.2C116.4 36.8 112.5 36.8 110.2 38.2L80.9 54.8C78.5 56.2 76.6 59.5 76.6 62.2V95.4C76.6 98.1 78.5 101.4 80.9 102.8L110.1 119.4C112.5 120.7 116.4 120.7 118.7 119.4L142.4 105.9C144.8 104.5 148 103.7 151.2 104.4L158.4 106.1Z" fill="#E52531" />
                        <path d="M257.6 95.8C255.4 95.8 253.5 96.6 252 98.1C249.6 100.4 246.9 102.2 243.8 103.5C240.8 104.8 237.5 105.4 234 105.4C230.5 105.4 227.2 104.7 224.1 103.4C221 102.1 218.3 100.2 216 97.9C213.7 95.6 211.8 92.9 210.5 89.8C209.2 86.8 208.5 83.4 208.5 79.9C208.5 76.4 209.2 73 210.5 69.9C211.8 66.8 213.7 64 216 61.7C218.3 59.4 221 57.5 224.1 56.2C227.1 54.9 230.5 54.2 234 54.2C237.5 54.2 240.8 54.8 243.8 56.1C246.8 57.4 249.6 59.1 252 61.2C253.5 62.7 255.4 63.4 257.5 63.4C259.4 63.4 261.2 62.7 262.7 61.4C264.3 60 265.1 58.2 265.1 56.1C265.1 54.5 264.3 52.8 262.5 50.5C261 48.6 258.9 46.8 256.2 45C253.6 43.2 250.4 41.7 246.9 40.3C243.2 38.9 239 38.2 234.4 38.2H234.3C228.4 38.4 222.9 39.7 217.9 41.9C212.9 44.1 208.4 47.1 204.8 50.8C201.1 54.5 198.2 58.9 196.1 63.8C194 68.7 192.9 74.1 192.9 79.8C192.9 85.7 194 91.2 196.2 96.2C198.4 101.2 201.4 105.6 205.1 109.2C208.9 112.8 213.3 115.7 218.2 117.8C223.1 119.8 228.5 120.9 234.2 120.9C239 120.9 243.5 120.3 247.3 119C251.1 117.8 254.3 116.3 257 114.5C259.8 112.7 261.8 110.9 263.2 108.9C264.9 106.6 265.6 104.9 265.6 103.4C265.6 101.2 264.7 99.2 263.1 97.8C261.5 96.5 259.6 95.8 257.6 95.8Z" fill="white" />
                        <path d="M325.7 65.9C322.8 63 319.4 60.6 315.5 58.9C311.6 57.2 307.4 56.3 303.2 56.3H303.1C298.5 56.5 294.2 57.4 290.3 59.2C286.4 60.9 282.9 63.3 280 66.1C277.1 69 274.8 72.4 273.2 76.3C271.5 80.2 270.7 84.4 270.7 88.8C270.7 93.4 271.5 97.7 273.2 101.6C274.9 105.5 277.2 108.9 280.2 111.8C283.1 114.6 286.6 116.9 290.4 118.5C294.3 120.1 298.5 120.9 302.9 120.9C307.4 120.9 311.7 120 315.6 118.3C319.5 116.6 322.9 114.3 325.8 111.3C328.7 108.4 331 104.9 332.7 101.1C334.4 97.2 335.3 93 335.3 88.7C335.3 84.3 334.4 80 332.7 76.1C331 72.2 328.6 68.8 325.7 65.9ZM302.9 107.5C300.3 107.5 297.9 107 295.6 106C293.3 105 291.3 103.7 289.6 102C287.9 100.3 286.5 98.3 285.6 96C284.6 93.8 284.1 91.3 284.1 88.7C284.1 86.1 284.6 83.7 285.6 81.4C286.6 79.1 287.9 77.1 289.6 75.4C291.3 73.7 293.3 72.3 295.6 71.4C297.9 70.4 300.3 69.9 302.9 69.9C305.5 69.9 307.9 70.4 310.2 71.4C312.5 72.4 314.5 73.7 316.2 75.4C317.9 77.1 319.3 79.1 320.2 81.4C321.2 83.7 321.7 86.2 321.7 88.7C321.7 91.3 321.2 93.7 320.2 96C319.2 98.3 317.9 100.3 316.2 102C314.5 103.7 312.5 105.1 310.2 106C308 107 305.5 107.5 302.9 107.5Z" fill="white" />
                        <path d="M397.5 65.9C394.6 63 391.2 60.6 387.3 58.9C383.4 57.2 379.3 56.3 375 56.3H374.9C370.3 56.5 366 57.4 362.1 59.2C358.2 60.9 354.7 63.3 351.8 66.1C348.9 69 346.6 72.4 345 76.3C343.4 80.2 342.5 84.4 342.5 88.8C342.5 93.4 343.4 97.7 345 101.6C346.7 105.5 349 108.9 352 111.8C354.9 114.6 358.4 116.9 362.2 118.5C366.1 120.1 370.3 120.9 374.7 120.9C379.2 120.9 383.5 120 387.4 118.3C391.3 116.6 394.7 114.3 397.6 111.3C400.5 108.4 402.8 104.9 404.5 101.1C406.2 97.2 407.1 93 407.1 88.7C407.1 84.3 406.2 80 404.5 76.1C402.8 72.2 400.4 68.8 397.5 65.9ZM374.7 107.5C372.1 107.5 369.7 107 367.4 106C365.1 105 363.1 103.7 361.4 102C359.7 100.3 358.3 98.3 357.4 96C356.4 93.8 355.9 91.3 355.9 88.7C355.9 86.1 356.4 83.7 357.4 81.4C358.4 79.1 359.7 77.1 361.4 75.4C363.1 73.7 365.1 72.3 367.4 71.4C369.6 70.4 372.1 69.9 374.7 69.9C377.3 69.9 379.7 70.4 382 71.4C384.3 72.4 386.3 73.7 388 75.4C389.7 77.1 391.1 79.1 392 81.4C393 83.7 393.5 86.2 393.5 88.7C393.5 91.3 393 93.7 392.1 96C391.1 98.3 389.7 100.3 388.1 102C386.4 103.7 384.4 105.1 382.1 106C379.8 107 377.3 107.5 374.7 107.5Z" fill="white" />
                        <path d="M570.8 65.9C567.9 63 564.5 60.6 560.6 58.9C556.7 57.2 552.6 56.3 548.3 56.3H548.2C543.6 56.5 539.3 57.4 535.4 59.2C531.5 60.9 528 63.3 525.1 66.1C522.2 69 519.9 72.4 518.3 76.3C516.7 80.2 515.8 84.4 515.8 88.8C515.8 93.4 516.7 97.7 518.3 101.6C520 105.5 522.3 108.9 525.3 111.8C528.2 114.6 531.7 116.9 535.5 118.5C539.4 120.1 543.6 120.9 548 120.9C552.5 120.9 556.8 120 560.7 118.3C564.6 116.6 568 114.3 570.9 111.3C573.8 108.4 576.1 104.9 577.8 101.1C579.5 97.2 580.3 93 580.3 88.7C580.3 84.2 579.4 80 577.7 76.1C576.1 72.2 573.7 68.8 570.8 65.9ZM548 107.5C545.4 107.5 543 107 540.7 106C538.4 105 536.4 103.7 534.7 102C533 100.3 531.6 98.3 530.7 96C529.7 93.8 529.2 91.3 529.2 88.7C529.2 86.1 529.7 83.7 530.7 81.4C531.7 79.1 533 77.1 534.7 75.4C536.4 73.7 538.4 72.3 540.7 71.4C542.9 70.4 545.4 69.9 547.9 69.9C550.5 69.9 552.9 70.4 555.2 71.4C557.5 72.4 559.5 73.7 561.2 75.4C562.9 77.1 564.3 79.1 565.2 81.4C566.2 83.7 566.7 86.2 566.7 88.7C566.7 91.3 566.2 93.7 565.2 96C564.2 98.3 562.9 100.3 561.2 102C559.5 103.7 557.5 105.1 555.1 106C553.1 107 550.6 107.5 548 107.5Z" fill="white" />
                        <path d="M628.4 88.6L649 67.8L649.1 67.7C650.3 66.4 651 64.7 651 62.9C651 60.9 650.2 59.2 648.8 58C647.5 56.9 645.9 56.3 644.3 56.3C642.5 56.3 640.8 56.9 639.6 58.2L619 79L598.4 58.1C597.2 56.9 595.6 56.3 593.8 56.3C592.1 56.3 590.6 56.9 589.3 57.9C587.8 59.1 587 60.8 587 62.9C587 64.5 587.7 66.1 588.9 67.6L609.6 88.6L589 109.5L588.8 109.7C587.6 111.1 587 112.7 587 114.4C587 116.2 587.7 117.8 589.1 119.1C590.4 120.4 592 121 593.8 121C595.7 121 597.4 120.3 598.6 118.9L619 98.2L639.5 118.9C640.8 120.3 642.5 121 644.3 121C646 121 647.7 120.3 649 119.1C650.4 117.8 651.1 116.2 651.1 114.4C651.1 112.7 650.5 111.2 649.3 109.7L628.4 88.6Z" fill="white" />
                        <path d="M420.6 32.3C418.7 32.3 417.1 32.9 415.8 34C414.5 35.1 413.8 36.5 413.8 38.1V115.4C413.8 117 414.5 118.4 415.8 119.5C417.1 120.6 418.7 121.2 420.6 121.2C422.4 121.2 424.1 120.6 425.4 119.5C426.7 118.4 427.4 117 427.4 115.4V38.2C427.4 36.6 426.7 35.2 425.4 34.1C424.1 32.9 422.4 32.3 420.6 32.3Z" fill="white" />
                        <path d="M498.7 65.9C495.8 63 492.3 60.6 488.5 58.9C484.6 57.1 480.5 56.3 476.2 56.3H476.1C471.5 56.5 467.2 57.4 463.3 59.2C459.4 60.9 455.9 63.2 453 66.1C452.5 66.6 452 67.1 451.6 67.7V38.2C451.6 36.6 450.9 35.2 449.6 34.1C448.3 33 446.7 32.4 444.8 32.4C442.9 32.4 441.3 33 440 34.1C438.7 35.2 438 36.6 438 38.2V115.5C438 117.1 438.7 118.5 440 119.6C441.3 120.7 442.9 121.3 444.8 121.3C446.6 121.3 448.3 120.7 449.6 119.6C450.9 118.5 451.6 117.1 451.6 115.5V110.1C452.1 110.7 452.7 111.3 453.3 111.9C456.2 114.7 459.7 117 463.5 118.6C467.4 120.2 471.6 121 476 121C480.5 121 484.8 120.1 488.7 118.4C492.6 116.7 496 114.4 498.9 111.4C501.8 108.5 504.1 105 505.8 101.2C507.5 97.3 508.4 93.1 508.4 88.8C508.4 84.4 507.5 80.1 505.8 76.2C504 72.3 501.6 68.8 498.7 65.9ZM475.9 107.5C473.3 107.5 470.9 107 468.7 106C466.4 105 464.4 103.7 462.7 101.9C461 100.2 459.6 98.2 458.7 95.9C457.7 93.7 457.2 91.2 457.2 88.6C457.2 86 457.7 83.6 458.7 81.3C459.7 79 461 77 462.7 75.3C464.4 73.6 466.4 72.2 468.7 71.3C470.9 70.3 473.4 69.9 475.9 69.9C478.5 69.9 480.9 70.4 483.3 71.4C485.6 72.4 487.6 73.7 489.3 75.4C491 77.1 492.4 79.2 493.3 81.4C494.3 83.7 494.8 86.2 494.8 88.7C494.8 91.3 494.3 93.7 493.3 96C492.3 98.3 491 100.3 489.3 102C487.6 103.7 485.6 105.1 483.3 106C481 107 478.5 107.5 475.9 107.5Z" fill="white" />
                        <path d="M673.5 104.3H684V115H673.4L673.5 104.3Z" fill="white" />
                        <path d="M692.1 58.5H712.6C728.1 58.5 731.1 69 731.1 76C731.1 83 728.1 93.4 712.6 93.3H701.6V115H692.1V58.5ZM701.6 85.3H712C716.3 85.3 721.5 83.1 721.5 76C721.5 68.6 717.2 66.7 712.1 66.7H701.5L701.6 85.3Z" fill="white" />
                        <path d="M736.3 58.5H771.9V67H745.8V81.8H769.7V89.9H745.8V106.4H772.4V115H736.3V58.5Z" fill="white" />
                    </svg>

                   {/*  <svg className={styles.iconFiesta} width="200" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 0H0V100H100V0Z" fill="#FBFBFB" />
                        <path d="M10.9171 89.9766C10.0263 89.4424 9.89265 88.7078 10.1376 87.7284C10.9616 84.5454 11.7188 81.3179 12.4983 78.1126C12.5874 77.7119 12.6542 77.289 13.0105 76.9996C13.5005 76.5767 14.035 76.51 14.5918 76.8216C15.1485 77.1332 15.3712 77.6674 15.2153 78.2907C14.6586 80.6501 14.0795 82.9873 13.5005 85.3245C13.4114 85.6584 13.3446 85.97 13.211 86.4597C16.9524 85.0351 20.6048 83.6773 24.324 82.2528C23.255 81.2288 22.2751 80.2272 21.4288 79.092C18.7564 75.5306 17.4424 71.5017 17.1529 67.0722C17.0192 64.9798 16.7965 62.8652 16.6629 60.7729C16.5961 59.7045 17.4869 59.0144 18.4446 59.3483C19.135 59.5932 19.2908 60.1719 19.3577 60.8397C19.6026 63.6666 19.6917 66.5157 20.1149 69.3203C20.8498 74.0837 23.2105 77.9123 26.8851 80.984C27.1301 81.1843 27.286 81.1175 27.5087 81.0285C32.4973 79.1365 37.5082 77.2445 42.4968 75.3525C42.43 75.0854 42.185 75.0631 42.0069 74.9741C29.8248 68.7416 22.4755 58.9032 19.8476 45.5033C19.7808 45.1471 19.7363 44.7687 19.8031 44.4126C19.9367 43.7671 20.4267 43.4332 21.0502 43.4332C21.7629 43.4332 22.2306 43.8339 22.3865 44.5239C22.6314 45.6368 22.7873 46.772 23.0991 47.885C26.462 60.1719 34.0117 68.7861 45.7706 73.7276C46.0824 73.8611 46.3496 73.9057 46.6614 73.7944C49.5566 72.6814 52.4295 71.5907 55.3247 70.5C55.4138 70.4555 55.5029 70.3888 55.5474 70.3665C46.461 66.6493 39.2676 60.4613 32.965 53.0936C29.7358 49.3095 26.8629 45.2584 24.8808 40.6508C24.0345 38.7143 23.4109 36.711 23.4109 34.5519C23.4109 30.9905 25.8161 28.6978 29.3794 28.8536C29.6021 28.8536 29.8471 28.8981 30.0698 28.9426C30.9384 29.1207 31.3615 29.6994 31.2279 30.4785C31.1165 31.1908 30.5152 31.636 29.669 31.5469C29.2458 31.5024 28.8449 31.4802 28.4218 31.5692C26.8406 31.9031 26.1057 32.7712 26.0388 34.3738C25.9943 36.021 26.462 37.5568 27.0633 39.0704C28.7336 43.2106 31.2279 46.8388 34.034 50.2667C39.4235 56.8553 45.6592 62.4646 53.2535 66.4267C55.1465 67.4061 57.1286 68.1851 59.2889 68.4077C59.7788 68.4522 60.2688 68.4522 60.7587 68.3632C62.0281 68.1629 62.7408 67.4283 62.8967 66.1596C63.0749 64.6237 62.6963 63.1769 62.2286 61.73C62.1172 61.3961 61.9613 61.04 61.9168 60.6839C61.8277 60.0161 62.1395 59.5264 62.7853 59.2815C63.4089 59.059 64.1216 59.3038 64.3666 59.9271C65.3019 62.2865 65.9923 64.7127 65.3687 67.2948C64.9679 68.9864 63.8989 70.1216 62.2731 70.7226C57.2622 72.5924 52.2513 74.4621 47.2627 76.3541C35.682 80.7169 24.1013 85.1019 12.5206 89.4869C12.1643 89.6205 11.8079 89.7763 11.4516 89.9098C11.318 89.9766 11.1175 89.9766 10.9171 89.9766Z" fill="#E40521" />
                        <path d="M87.0158 89.9777C86.0582 89.0651 86.0359 88.8202 86.6372 87.507C87.5726 85.3701 87.4612 83.2778 86.1695 81.1186C86.0136 82.1871 85.88 83.0774 85.5014 83.9233C84.6328 85.8821 83.1407 86.995 81.0027 87.1508C78.7757 87.3289 77.0386 86.394 75.9473 84.4352C74.8783 82.521 74.9897 80.5844 76.2591 78.7815C77.3503 77.2456 78.8202 76.2439 80.6464 75.7542C80.78 75.732 80.8914 75.6875 81.025 75.6429C81.0695 75.6207 81.1141 75.5984 81.2032 75.5317C78.7311 72.7938 75.7023 70.9908 72.0945 70.145C71.8272 70.0782 71.5377 70.0337 71.2482 69.9669C70.4019 69.7889 69.8897 69.1656 70.001 68.4533C70.1347 67.6297 70.8251 67.1846 71.7604 67.3404C74.1211 67.7856 76.3704 68.6091 78.4416 69.8334C81.1586 71.436 83.3411 73.5729 85.0782 76.1994C85.2787 76.511 85.4791 76.7782 85.7909 77.0007C88.1293 78.6034 89.4878 80.8293 89.8219 83.6339C89.8441 83.7452 89.8442 83.8342 89.9778 83.8565C89.9778 84.4797 89.9778 85.103 89.9778 85.7262C89.666 85.9934 89.7773 86.394 89.666 86.7056C89.2874 87.8854 89.0869 89.1764 87.9289 89.9332C87.6394 89.9777 87.3276 89.9777 87.0158 89.9777ZM83.4748 80.8515C83.4525 80.4954 83.4525 80.117 83.3634 79.7608C83.0516 78.3585 82.3612 77.9579 81.0027 78.4031C79.9115 78.7592 79.0206 79.4047 78.3971 80.3841C77.5731 81.6529 77.9294 83.3445 79.1988 84.1236C80.5128 84.9249 82.2276 84.4575 82.9403 83.0997C83.3189 82.4097 83.4525 81.6529 83.4748 80.8515Z" fill="#E40521" />
                        <path d="M90 37.1777C89.2205 38.2461 88.0847 38.0236 87.0157 37.9123C86.4144 37.8677 86.0581 37.378 85.9913 36.7771C85.9245 36.1761 86.1695 35.6641 86.7262 35.4638C87.5502 35.1744 88.3965 35.1967 89.2428 35.4638C89.6659 35.5973 89.7773 36.0425 89.9777 36.3764C90 36.6435 90 36.9106 90 37.1777Z" fill="#E40521" />
                        <path d="M87.9511 89.9745C89.1092 89.1955 89.3096 87.9267 89.6882 86.747C89.7996 86.4131 89.6882 86.0347 90 85.7676C90 87.0363 89.9777 88.3274 90 89.5961C90 89.93 89.9332 90.019 89.5991 89.9968C89.0646 89.93 88.5079 89.9745 87.9511 89.9745Z" fill="#F9F9F9" />
                        <path d="M25.972 16.1888C25.972 16.6117 25.7716 16.9234 25.4821 17.2127C24.7249 17.925 24.0122 18.6818 23.2327 19.3941C22.8541 19.728 22.7428 20.0396 22.8541 20.5516C23.0768 21.531 23.2105 22.5549 23.3886 23.5343C23.5 24.1353 23.4109 24.6917 22.8764 25.0701C22.3419 25.4485 21.8074 25.3595 21.2729 25.0479C20.3821 24.5582 19.469 24.113 18.6004 23.6233C18.1996 23.4007 17.8655 23.3785 17.4424 23.601C16.5516 24.113 15.6162 24.5804 14.7031 25.0701C14.1463 25.3595 13.6118 25.4485 13.0996 25.0479C12.6097 24.6695 12.4983 24.1798 12.6097 23.5788C12.8101 22.5104 12.9437 21.4197 13.1664 20.3512C13.2555 19.9506 13.1441 19.728 12.8546 19.4831C12.0752 18.7486 11.318 17.9918 10.5608 17.2573C10.1153 16.8343 9.8481 16.3446 10.0931 15.7214C10.3158 15.1204 10.7835 14.8755 11.407 14.8088C12.476 14.6752 13.5227 14.4971 14.5695 14.3636C14.9258 14.3191 15.1262 14.1633 15.2599 13.8516C15.7275 12.8945 16.2175 11.9374 16.6629 10.9802C16.9302 10.4015 17.3533 10.0454 17.9769 10.0454C18.6004 10.0454 19.0236 10.4015 19.3131 10.9802C19.7585 11.9151 20.2485 12.8277 20.6716 13.7849C20.8498 14.1633 21.0725 14.3191 21.4956 14.3636C22.5869 14.4749 23.6559 14.653 24.7471 14.831C25.5489 14.9646 25.9943 15.4765 25.972 16.1888ZM15.683 21.5087C17.2642 20.1732 18.7563 20.3512 20.2485 21.5977C20.3153 20.5738 19.7808 19.7948 20.0926 18.9489C20.3821 18.1699 21.2952 17.836 21.7183 16.9679C19.6694 17.2127 18.5336 16.2556 17.9991 14.3413C17.4646 16.2779 16.2843 17.235 14.2354 17.1014C15.9057 18.2144 16.3511 19.6167 15.683 21.5087Z" fill="#E40521" />
                        <path d="M81.9826 36.5784C81.9603 37.3129 81.5149 37.7136 80.9136 38.0029C78.0184 39.3607 75.1455 40.7408 72.2726 42.1208C66.0368 45.0813 59.8233 48.0417 53.5876 51.0022C53.4985 51.0467 53.4094 51.0912 53.298 51.1357C52.4963 51.4696 51.7614 51.2247 51.4273 50.557C51.1155 49.8669 51.3828 49.1324 52.1622 48.754C53.9662 47.8859 55.7701 47.0401 57.574 46.172C64.9456 42.6551 72.3171 39.1604 79.711 35.6435C80.1118 35.4432 80.5127 35.2428 80.9804 35.3764C81.604 35.5322 81.9158 35.9774 81.9826 36.5784Z" fill="#E40521" />
                        <path d="M43.2986 27.8067C43.3431 33.7276 41.9623 39.3368 39.5794 44.7012C39.1562 45.6806 38.7776 46.66 38.3545 47.6394C37.9981 48.4852 37.2632 48.8191 36.5283 48.5075C35.8156 48.2181 35.5484 47.4613 35.9047 46.5932C37.0628 43.6773 38.4213 40.8504 39.2676 37.801C40.8933 31.9691 41.0938 26.0705 39.8689 20.1274C39.8243 19.927 39.8021 19.7267 39.7575 19.5041C39.6462 18.7251 40.0916 18.0796 40.8042 17.9237C41.4724 17.7902 42.1405 18.1908 42.3186 18.9476C42.6972 20.4167 42.8977 21.9081 43.0758 23.3994C43.254 24.8908 43.3208 26.3599 43.2986 27.8067Z" fill="#E40521" />
                        <path d="M60.4915 53.9186C66.8831 53.9631 71.9163 54.8312 76.7713 56.5896C77.239 56.7677 77.7066 56.968 77.8848 57.48C78.063 57.9919 77.9962 58.4594 77.6398 58.86C77.1944 59.3497 76.6377 59.3943 76.0586 59.1939C74.4997 58.6152 72.9185 58.1255 71.2927 57.7471C65.7028 56.4116 60.0683 56.278 54.4116 57.2574C53.0531 57.5023 51.6946 57.7248 50.3361 57.9474C49.4898 58.081 48.8217 57.6135 48.7103 56.879C48.599 56.1222 49.0221 55.4767 49.8016 55.3431C53.7658 54.6531 57.6854 53.8518 60.4915 53.9186Z" fill="#E40521" />
                        <path d="M63.9879 24.6248C65.0346 24.6248 66.0591 24.6248 67.1058 24.6248C68.1303 24.647 68.6202 25.07 68.6202 26.0716C68.6425 28.2085 68.6425 30.3231 68.6202 32.4599C68.6202 33.4616 68.1303 33.9513 67.1281 33.9513C65.0124 33.9735 62.9189 33.9735 60.8032 33.9513C59.7565 33.9513 59.2888 33.4616 59.2666 32.4154C59.2443 30.3008 59.2443 28.2085 59.2666 26.0939C59.2666 25.0922 59.7565 24.6248 60.7587 24.6248C61.8722 24.6248 62.9189 24.6248 63.9879 24.6248ZM61.9613 29.0988C61.9613 29.7221 61.9836 30.2563 61.9613 30.7682C61.939 31.1689 62.0504 31.347 62.4735 31.3025C62.9858 31.2579 63.5202 31.3025 64.0325 31.2802C64.656 31.2579 65.4355 31.5473 65.8364 31.1689C66.2373 30.7905 65.9477 29.9892 65.9477 29.3659C65.9477 28.6982 66.2373 27.8301 65.8364 27.4071C65.4355 26.9842 64.5447 27.2958 63.8766 27.2736C63.253 27.2513 62.4513 27.0733 62.0727 27.3849C61.6941 27.7633 62.0281 28.5869 61.9613 29.0988Z" fill="#E40521" />
                        <path d="M43.2985 49.9784C42.7641 49.9561 42.3409 49.689 42.0959 49.1771C41.8732 48.6429 41.94 48.1532 42.3409 47.7302C42.7641 47.3073 43.2095 46.9289 43.6549 46.5283C47.53 43.0336 51.4273 39.539 55.3247 36.0443C55.5474 35.844 55.7478 35.6436 55.9928 35.5101C56.5718 35.1985 57.1063 35.3098 57.5517 35.7549C57.9971 36.2224 58.064 36.7789 57.7522 37.3353C57.6185 37.5579 57.4181 37.736 57.2399 37.9141C52.9863 41.7426 48.7326 45.5711 44.4789 49.3997C44.1671 49.6668 43.833 49.9561 43.2985 49.9784Z" fill="#E40521" />
                        <path d="M83.3188 65.9354C81.114 65.9354 79.3323 64.1992 79.3323 61.9956C79.3101 59.7474 81.0694 57.9445 83.2965 57.9445C85.5013 57.9445 87.3275 59.7697 87.3052 61.9733C87.3052 64.1547 85.5236 65.9354 83.3188 65.9354ZM84.655 61.9733C84.6773 61.2611 84.0537 60.6155 83.3188 60.6155C82.6061 60.6155 82.0271 61.172 82.0048 61.8843C81.9603 62.6411 82.517 63.2421 83.2742 63.2643C84.0092 63.2866 84.6327 62.7079 84.655 61.9733Z" fill="#E40521" />
                        <path d="M55.3024 24.6247C55.3024 26.8728 53.5207 28.6313 51.2937 28.6313C49.0889 28.609 47.3295 26.8728 47.3295 24.6692C47.3295 22.4433 49.1334 20.6403 51.3382 20.6403C53.5207 20.6626 55.3024 22.4433 55.3024 24.6247ZM51.3382 23.3114C50.6256 23.3114 50.002 23.9346 50.002 24.6469C50.002 25.3592 50.5588 25.9379 51.2714 25.9602C52.0286 25.9825 52.6299 25.426 52.6522 24.6915C52.6522 23.9569 52.0509 23.3114 51.3382 23.3114Z" fill="#E40521" />
                        <path d="M39.3344 15.3199C37.8422 15.3199 36.6619 14.1624 36.6619 12.6711C36.6619 11.1797 37.8422 10 39.3344 10C40.782 10 41.9623 11.1797 41.9846 12.6266C42.0291 14.0734 40.8042 15.2976 39.3344 15.3199Z" fill="#E40521" />
                        <path d="M80.045 14.0067C81.359 13.9845 82.0048 14.4519 81.9826 15.3422C81.9603 16.2326 81.3144 16.6778 79.9782 16.6555C79.6441 16.6555 79.3101 16.6555 78.976 16.5665C78.3302 16.4107 77.8848 15.8097 77.9738 15.1864C78.0629 14.4964 78.4638 14.0512 79.1765 13.9845C79.466 13.9845 79.7555 14.0067 80.045 14.0067Z" fill="#E40521" />
                        <path d="M73.3861 14.0044C73.542 14.0044 73.6979 14.0044 73.8538 14.0044C74.7446 14.0489 75.3014 14.5164 75.3236 15.2954C75.3459 16.0745 74.8114 16.6087 73.9429 16.6755C73.4974 16.6978 73.052 16.6978 72.6066 16.6532C71.8049 16.5642 71.2927 15.9855 71.3372 15.2509C71.3817 14.5386 71.894 14.0489 72.6734 14.0044C72.9184 13.9822 73.1411 14.0044 73.3861 14.0044Z" fill="#E40521" />
                        <path d="M87.9957 41.361C87.9734 41.873 87.7507 42.2514 87.3053 42.4962C86.8153 42.7411 86.3254 42.7411 85.9245 42.3849C85.4791 42.0288 85.0782 41.6059 84.7219 41.183C84.3656 40.76 84.3878 40.2703 84.6328 39.7806C84.8555 39.3355 85.2787 39.0906 85.7686 39.0684C86.5926 39.0461 88.0179 40.4929 87.9957 41.361Z" fill="#E40521" />
                        <path d="M83.2965 42.6512C83.2965 43.9867 82.8734 44.6322 82.0049 44.6322C81.0918 44.6322 80.6463 43.9644 80.6463 42.6066C80.6463 42.295 80.6241 41.9834 80.6909 41.6718C80.869 40.9817 81.3367 40.6256 82.0494 40.6256C82.7175 40.6256 83.2297 41.1598 83.2965 41.8721C83.3188 42.1392 83.2965 42.4063 83.2965 42.6512Z" fill="#E40521" />
                        <path d="M83.2966 30.6104C83.2966 30.833 83.3188 31.0779 83.2966 31.3005C83.252 32.0573 82.7621 32.5915 82.0494 32.6137C81.3367 32.6583 80.7132 32.124 80.6464 31.345C80.6018 30.8998 80.6241 30.4769 80.6464 30.0317C80.6909 29.1859 81.2477 28.6294 82.0049 28.6294C82.7621 28.6294 83.2743 29.2081 83.3188 30.054C83.2966 30.2543 83.2966 30.4324 83.2966 30.6104Z" fill="#E40521" />
                        <path d="M79.5329 32.7497C79.5106 33.373 79.2656 33.7514 78.8425 34.0185C78.3748 34.2856 77.8626 34.2856 77.4617 33.9294C77.0163 33.5733 76.6154 33.1726 76.2368 32.7274C75.7914 32.1932 75.8582 31.5032 76.3482 31.0358C76.8158 30.5461 77.5285 30.4348 78.0407 30.88C78.6643 31.4142 79.4438 31.9039 79.5329 32.7497Z" fill="#E40521" />
                        <path d="M77.9739 12.0038C77.9739 13.3393 77.573 13.9626 76.6822 13.9848C75.7691 14.0071 75.3237 13.3393 75.3237 11.9815C75.3237 11.7589 75.3014 11.5141 75.3237 11.2915C75.3905 10.5124 75.9918 9.97822 76.7044 10.0227C77.4171 10.045 77.9293 10.5792 77.9739 11.336C77.9739 11.5364 77.9739 11.7812 77.9739 12.0038Z" fill="#E40521" />
                        <path d="M77.9739 18.6358C77.9739 18.9029 77.9961 19.1477 77.9739 19.4148C77.9071 20.1049 77.4394 20.5723 76.7713 20.6391C76.0809 20.6836 75.4573 20.2607 75.3682 19.5707C75.3014 18.9919 75.3014 18.3687 75.3682 17.7899C75.435 17.0999 76.0586 16.6547 76.749 16.6993C77.4394 16.7438 77.9293 17.2112 77.9961 17.9458C77.9739 18.1683 77.9739 18.3909 77.9739 18.6358Z" fill="#E40521" />
                        <path d="M85.635 34.1956C85.2341 34.1733 84.8555 33.9507 84.5883 33.5278C84.3433 33.0826 84.321 32.6152 84.6105 32.1923C85.0114 31.6358 85.4568 31.1238 86.0359 30.79C86.8821 30.278 87.9511 30.9235 87.9734 31.9252C87.9957 32.771 86.5926 34.1956 85.635 34.1956Z" fill="#E40521" />
                        <path d="M51.3382 23.3114C52.0509 23.3114 52.6745 23.9569 52.6522 24.6915C52.6299 25.4483 52.0286 26.0047 51.2714 25.9602C50.5588 25.9379 50.002 25.3592 50.002 24.6469C49.9797 23.9346 50.6033 23.3114 51.3382 23.3114Z" fill="#F9F9F9" />
                    </svg> */}

                    {/* <p className={styles.earlyDesktop}>Te deseamos mucha</p> */}
            {/*         <p className={styles.earlyMobile}>Te deseamos mucha</p>
                    <p className={styles.promotion}>suerte</p> */}
                     <p className={styles.stepTwo}>Continua con el paso 2</p>
                </div>

                <form class={styles.FormSolicredi} action="" id="form" onSubmit={handleSubmit}>
                    {/* FORMULARIO DE SOLCITUD DE CREDITO */}

                    <div className={styles.containerInputs}>
                        <div className={styles.inputForm}>
                            <label htmlFor="tipoServicio" className={styles.labelText}>Tipo de Servicio</label>
                            <select id="tipoServicio" name="tipoServicio" onChange={handleChange} value={form.tipoServicio} className={styles.selectForm}>
                                <option value="" >Seleccionar tipo de servicio</option>
                                <option value="Venta Corporativa" >Venta Corporativa</option>
                                <option value="Venta Por Mayor" >Venta Por Mayor</option>
                                <option value="Venta Emprendedor" >Venta Emprendedor</option>
                            </select>
                            <span id="errorTipoServicio" className={styles.errorText} >Seleccione un valor válido por favor</span>
                        </div>
                    </div>

                    <div className={styles.containerInputs}>
                        <div className={styles.inputForm}>
                            <label htmlFor="nombre" className={styles.labelText}>Nombre</label>
                            <input type="text" id='nombre' disabled={disableForm} name="nombre" value={form.nombre} onChange={handleChange} placeholder='Ingresar nombre' />
                            <span id="errorNombre" className={styles.errorText} >Ingrese un valor válido por favor</span>
                        </div>
                        <div className={styles.inputForm}>
                            <label htmlFor="celular" className={styles.labelText}>Celular</label>
                            <input type="text" id="celular" disabled={disableForm} name="celular" value={form.celular} onChange={handleChange} placeholder='Ingresar número de celular' />
                            <span id="errorCelular" className={styles.errorText} >Ingrese un valor válido por favor</span>
                        </div>
                    </div>

                    <div className={styles.containerInputs}>
                        <div className={styles.inputForm}>
                            <label htmlFor="correo" className={styles.labelText}>Correo</label>
                            <input type="text" id="correo" disabled={disableForm} name="correo" value={form.correo} onChange={handleChange} placeholder='Ingresar correo' />
                            <span id="errorCorreo" className={styles.errorText} >Ingrese un valor válido por favor</span>
                        </div>
                        <div className={styles.inputForm}>
                            <label htmlFor="razonSocial" className={styles.labelText}>Razón social de la empresa</label>
                            <input type="text" id="razonSocial" disabled={disableForm} name="razonSocial" value={form.razonSocial} onChange={handleChange} placeholder='Ingresar razón social' />
                            <span id="errorRazonSocial" className={styles.errorText} >Ingrese un valor válido por favor</span>
                        </div>
                    </div>
                    {/*
                    <div className={styles.containerInputsFile}>
                        <div className={styles.inputFile}>
                            <div className={styles.containerTextFile}>
                                <span>Solicitud de línea de crédito</span>
                                <a href="FORMATO_SOLICITUD_DE_LINEA_DE_CREDITO_COOLBOX.pdf" download="Formato-SLCCoolbox.pdf" className={styles.downloadRequest}>Descargar solicitud<img src={iconDownload} alt="" /></a>
                                <span className={styles.reminderMessage}>Subirlo firmado por el representante legal.</span>
                            </div>
                        </div>
                           <button className={styles.buttonFile}>Subir Solicitud
                                <label htmlFor="subirSolicitud"></label>
                                <img src={iconUpload} alt="" />
                                <input type="file" id="subirSolicitud" />
                            </button> 
   
                    </div>


                    {/*         <div className={styles.containerInputsFile}>
                        <div className={styles.inputFile}>
                            <label htmlFor="">Ficha RUC</label>
                            <button className={styles.buttonFile}>Subir Ficha RUC
                                <label htmlFor="subirFicha"></label>
                                <img src={iconUpload} alt="" />
                                <input type="file" id="subirFicha" />
                            </button> */}
                    {/* <input type="file" id="subirFicha" /> */}
                    {/* <input type="file" name="" id="uploadBtn" className={styles.butonTest} onChange={e => console.log(e)}/> */}
                    {/* <input type="file" name="" id="uploadBtn" onChange={e => console.log(e.target.files[0])}/> */}
                    {/* <label htmlFor="uploadBtn" className={styles.labelTest}>Subir Prueba</label> */}
                    {/*    </div>
                    </div> */}

                    {/*       <div className={styles.containerInputsFile}>
                        <div className={styles.inputFile}>
                            <label htmlFor="">Copia DNI del representante legal</label>
                            <button className={styles.buttonFile}>Subir DNI
                                <label htmlFor="copia-dni"></label>
                                <img src={iconUpload} alt="" />
                                <input type="file" id="copia-dni" />
                            </button>
                        </div>
                    </div> */}


                    <div className={styles.containerSubmit}>
                        <input id='send' disabled={disableForm} type="submit" value="Enviar" />
                    </div>
                </form>

                <div>

                    <div className={styles.containerInputsFile}>
                        <div className={styles.inputFile}>
                            <div className={styles.containerTextFile}>
                                <span className={styles.formSubtitle}>2. Solicita línea de crédito</span>
                                <ul className={styles.ulform}>
                                    <li className={styles.listFormDonw}>Descarga la solicitud<a href="FORMATO_SOLICITUD_DE_LINEA_DE_CREDITO_COOLBOX.pdf" download="Formato-SLCCoolbox.pdf" className={styles.downloadRequest}>aquí.</a></li>
                                </ul>
                                {/* <a href="FORMATO_SOLICITUD_DE_LINEA_DE_CREDITO_COOLBOX.pdf" download="Formato-SLCCoolbox.pdf" className={styles.downloadRequest}>Descargar solicitud<img src={iconDownload} alt="" /></a> */}
                                <span className={styles.formSubtitle}>3. Envia la siguiente documentación</span>
                                <ul className={styles.ulform}>
                                    <li className={styles.listForm}>Solicitud de crédito firmado por el representante legal.</li>
                                    <li className={styles.listForm}>Adjunta tu ficha RUC y copia del DNI del representante legal y envia a este correo: <a className={styles.downloadRequest} href="mailto:ventacorporativa@rashperu.com">ventacorporativa@rashperu.com</a></li>
                                </ul>
                                {/*   <span className={styles.reminderMessage}>Subirlo firmado por el representante legal.</span> */}
                            </div>
                        </div>
                    </div>
                    {/*   <div className={styles.containerTextFile}>
                        <span className={styles.reminderMessage}>Adjunta tu ficha RUC y copia del DNI del representante legal y envia a este correo:</span>
                    </div> */}
                </div>
                {/* <canvas id="my-canvas"></canvas> */}
            </div>
        </>
    )
};





