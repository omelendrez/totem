Private Declare Function ConsultarVersionDll Lib "EpsonFiscalInterface.dll" (ByVal descripcion, ByVal descripcion_largo_maximo, ByVal mayor, ByVal menor)

  Dim msg
  Dim error As Long
  Dim str As String
  Dim mayor As Long
  Dim menor As Long

  ' init sring with length
  str = String(100, vbNullChar)

  ' get version info
  error = ConsultarVersionDll(str, Len(str), VarPtr(mayor), VarPtr(menor))

  ' prepare show message
  If error <> ERROR_NINGUNO Then
    msg = MsgBox(error, vbOKOnly, "Error: ConsultarVersionDll()")
  End If

  ' mostrar la version de la dll
  msg = MsgBox(str, vbOKOnly, "DLL version")
