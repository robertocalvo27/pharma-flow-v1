# Configuración de Email Templates Personalizados en Supabase

## 📧 **Email de Confirmación Personalizado para PharmaFlow**

### **Paso 1: Acceder a la Configuración de Auth**

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Navega a **Authentication** > **Settings**
3. Busca la sección **Email Templates**

### **Paso 2: Configurar el Template de Confirmación**

1. Haz clic en **"Confirm signup"** en la lista de templates
2. Reemplaza el contenido HTML existente con el template que creamos
3. Copia todo el contenido del archivo `docs/email-templates/confirm-signup.html`

### **Paso 3: Variables Disponibles**

El template utiliza estas variables de Supabase:

- `{{ .Email }}` - Email del usuario
- `{{ .ConfirmationURL }}` - URL de confirmación
- `{{ .CreatedAt }}` - Fecha de creación de la cuenta

### **Paso 4: Configuración Adicional**

#### **Subject Line (Asunto del Email):**
```
🚀 Confirma tu cuenta en PharmaFlow - ¡Bienvenido!
```

#### **Configuración SMTP (Opcional pero Recomendado):**

Para un email más profesional, configura tu propio SMTP:

1. Ve a **Authentication** > **Settings** > **SMTP Settings**
2. Configura tu servidor SMTP (recomendamos SendGrid, Mailgun, o AWS SES)

**Ejemplo con SendGrid:**
```
SMTP Host: smtp.sendgrid.net
SMTP Port: 587
SMTP User: apikey
SMTP Pass: [tu-api-key-de-sendgrid]
Sender Email: noreply@pharmaflow.com
Sender Name: PharmaFlow
```

### **Paso 5: Personalización del Dominio**

Para emails más profesionales, configura un dominio personalizado:

1. **DNS Records necesarios:**
```
CNAME: mail.tudominio.com -> smtp.sendgrid.net
TXT: v=spf1 include:sendgrid.net ~all
DKIM: [configurar según tu proveedor SMTP]
```

2. **Actualizar configuración en Supabase:**
```
Site URL: https://tudominio.com
Redirect URLs: https://tudominio.com/auth/callback
```

### **Paso 6: Testing**

1. Crea una cuenta de prueba en tu aplicación
2. Verifica que el email llegue con el nuevo diseño
3. Confirma que el enlace de confirmación funcione correctamente

### **Características del Nuevo Email:**

✅ **Diseño Profesional** - Gradientes y animaciones sutiles
✅ **Branding Consistente** - Logo y colores de PharmaFlow
✅ **Responsive** - Se ve perfecto en móviles y desktop
✅ **Call-to-Action Prominente** - Botón de confirmación destacado
✅ **Información de Seguridad** - Nota sobre seguridad incluida
✅ **Features Destacadas** - Muestra los beneficios de PharmaFlow
✅ **Footer Completo** - Links legales y redes sociales
✅ **Animaciones CSS** - Efectos hover y elementos flotantes

### **Otros Templates Recomendados:**

También puedes personalizar estos templates adicionales:

- **Magic Link** - Para login sin contraseña
- **Recovery** - Para recuperación de contraseña
- **Email Change** - Para cambio de email
- **Invite** - Para invitaciones de usuarios

### **Mejores Prácticas:**

1. **Prueba en múltiples clientes de email** (Gmail, Outlook, Apple Mail)
2. **Mantén el HTML inline** para mejor compatibilidad
3. **Usa imágenes alojadas externamente** si las necesitas
4. **Incluye texto alternativo** para accesibilidad
5. **Monitorea las tasas de entrega** y apertura

### **Troubleshooting:**

**Si los emails no llegan:**
- Verifica la configuración SMTP
- Revisa la carpeta de spam
- Confirma que el dominio esté verificado

**Si el diseño se ve mal:**
- Algunos clientes de email no soportan CSS avanzado
- Usa tablas HTML para layouts complejos si es necesario
- Prueba con herramientas como Litmus o Email on Acid

### **Próximos Pasos:**

1. Configurar el template en Supabase
2. Probar con una cuenta real
3. Configurar SMTP personalizado (opcional)
4. Personalizar otros templates de email
5. Configurar analytics de email (opcional)

¡Tu sistema de autenticación ahora tendrá emails que reflejan la calidad y profesionalismo de PharmaFlow! 🎉 