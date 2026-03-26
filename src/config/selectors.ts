export const SEL = {
  // Login
  user: "id=es.indra.pc.mobile.activity.temm:id/user",
  password: "id=es.indra.pc.mobile.activity.temm:id/password",
  btnOk: "id=es.indra.pc.mobile.activity.temm:id/btnOk",

  // Dominio / ambiente
  spinnerDominio: "id=es.indra.pc.mobile.activity.temm:id/spinner_dominio",
  optionLocalByText: 'android=new UiSelector().text("Local")',

  // Post-login - Menú principal
  menuPortaSinDnTransito: 'android=new UiSelector().text("Porta SIN DN Transitorio")',
  menuPortaSinDnTransitoById: "id=es.indra.pc.mobile.activity.temm:id/label",

  // Formulario de búsqueda - Port sin DN Tránsito
  dnInput: "id=es.indra.pc.mobile.activity.temm:id/msisdnText",
  rfcInput: "id=es.indra.pc.mobile.activity.temm:id/rfcText",
  requestIdInput: "id=es.indra.pc.mobile.activity.temm:id/requestIdSearchText",
  btnContinuar: "id=es.indra.pc.mobile.activity.temm:id/btnNext",

  // Modal de resultado - Interconexión
  dialogMessage: "id=es.indra.pc.mobile.activity.temm:id/dialog_message",
  btnAceptar: "id=android:id/button1",
  btnAceptarByText: 'android=new UiSelector().text("Aceptar")',
  btnAceptarByOK: 'android=new UiSelector().text("OK")',

  // Modal ml-prepago rollover portabilidad
  modalRollover: 'android=new UiSelector().textContains("ml-prepago")',
  modalRolloverByTitle: 'android=new UiSelector().textContains("rollover")',
  btnCerrarModalRollover: "id=android:id/button2",
  btnCerrarModalRolloverText: 'android=new UiSelector().text("Aceptar")',

  // Modal "Está a punto de salir"
  modalSalir: 'android=new UiSelector().textContains("a punto de salir")',
  modalSalirByVentana: 'android=new UiSelector().textContains("ventana")',
  btnCancelarModalSalir: 'android=new UiSelector().text("Cancelar")',

  // Sección 2: Datos personales - Indicador de tab/sección
  tabDatosPersonales: 'android=new UiSelector().text("2.- Datos personales")',
  tabDatosPersonalesById: "id=es.indra.pc.mobile.activity.temm:id/tab_text",
  tabDatosPersonalesLayout: '//android.widget.TextView[@text="2.- Datos personales"]/..',

  // Bloqueo ICC
  iccInput: "id=es.indra.pc.mobile.activity.temm:id/iccText",
  btnBloquearICC: "id=es.indra.pc.mobile.activity.temm:id/btnReserve",

  // Continuar trámite
  btnContinuarTramite: "id=es.indra.pc.mobile.activity.temm:id/btnOnNext",

  // Sección Línea - NIP y FVC
  nipInput: "id=es.indra.pc.mobile.activity.temm:id/pinText",

  // Spinner de Plan Comercial
  commercialPlanSpinner: "id=es.indra.pc.mobile.activity.temm:id/commercialPlanPrepaidSpin",
  mlRolloverOption: 'android=new UiSelector().text("ML - Prepago Rollover Portabilidad")',

  // Spinner de ML Prepago Rollover Portabilidad
  mlRolloverSpinner: "id=es.indra.pc.mobile.activity.temm:id/textview_spinner",

  // Spinner de FVC (fecha)
  fvcSpinner: "id=es.indra.pc.mobile.activity.temm:id/fvcSuggestedSpin",

  // Botón SIGUIENTE
  btnSiguienteByText: 'android=new UiSelector().text("SIGUIENTE")',
  btnSiguienteInTableRow: '//android.widget.TableRow//android.widget.Button[@text="SIGUIENTE"]',
  btnSiguienteXPath: '//android.widget.Button[@text="SIGUIENTE"]',

  // Sección 2: Datos Personales
  nombreText: "id=es.indra.pc.mobile.activity.temm:id/nameText",
  nombreSecondText: "id=es.indra.pc.mobile.activity.temm:id/nameSecondText",
  surnameText: "id=es.indra.pc.mobile.activity.temm:id/surnameText",
  surnameSecondText: "id=es.indra.pc.mobile.activity.temm:id/surnameSecondText",
  curpText: "id=es.indra.pc.mobile.activity.temm:id/curpText",
  phoneText: "id=es.indra.pc.mobile.activity.temm:id/phoneText",
  phoneSecondText: "id=es.indra.pc.mobile.activity.temm:id/phoneSecondText",
  generoSpinner: "id=es.indra.pc.mobile.activity.temm:id/textview_spinner",
  personalEmailText: "id=es.indra.pc.mobile.activity.temm:id/personalEmailText",
  birthDateText: "id=es.indra.pc.mobile.activity.temm:id/birthDateText",

  // Opciones de género
  generoMasculino: 'android=new UiSelector().text("Masculino")',
  generoFemenino: 'android=new UiSelector().text("Femenino")',

  // Botones de navegación
  btnSiguiente2: 'android=new UiSelector().text("SIGUIENTE")',
  btnAnterior: 'android=new UiSelector().text("ANTERIOR")',
  btnEnviar: 'android=new UiSelector().text("ENVIAR")',

  // Diálogo de éxito con FolioID
  dialogSuccessMessage: "id=es.indra.pc.mobile.activity.temm:id/dialog_message",
  dialogSuccessText: 'android=new UiSelector().textContains("Tramite enviado correctamente a ONIX")',
  dialogSuccessFolio: 'android=new UiSelector().textContains("FolioID:")',
  dialogSuccessBtnAceptar: "id=android:id/button1",

  // Diálogos de error del APK
  dialogErrorMessage: "id=es.indra.pc.mobile.activity.temm:id/dialog_message",
  dialogErrorText: 'android=new UiSelector().textContains("Error")',
  dialogErrorValidation: 'android=new UiSelector().textContains("Lista de errores:")',
  dialogErrorCurp7: 'android=new UiSelector().textContains("CURP del cliente cuenta con")',
  dialogErrorBtnAceptar: "id=android:id/button1",
} as const;
