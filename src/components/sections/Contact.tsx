"use client"

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  AlertTriangleIcon
} from "lucide-react"
import { FiInstagram } from "react-icons/fi";
import { useState } from "react"
import Button from "../ui/Button"
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import { sendEmail } from "@/services/contact-services";
import { Alert, AlertDescription, AlertTitle } from "../ui/Alert";

const locations = [
  {
    address: "9 de Julio 291",
    phone: "3534117540",
  },
  {
    address: "Jose Ingenieros 244",
    phone: "3534117494",
  },
]

export function Contact() {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"destructive" | "default">("default");
  const [loading, setLoading] = useState(false);  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const response = await sendEmail(formData);

    if (response.mensaje === "Correo enviado con éxito") {
      setAlertMessage("Correo enviado con éxito");
      setAlertSeverity("default");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } else {
      setAlertMessage("Error al enviar el correo. Inténtalo nuevamente.");
      setAlertSeverity("destructive");
    }
    setLoading(false);
    setOpen(true); // Mostrar alerta
  };

  return (
    <section id="contacto" className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Contacto
          </span>
          <h2 className="mt-4 italic text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Estamos para ayudarte
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Visitanos en nuestras sucursales o contactanos por cualquiera de nuestros canales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Nuestras Sucursales</h3>
              <div className="space-y-6">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-background rounded-xl border border-border"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{location.address}</p>
                      <a
                        href={`tel:${location.phone}`}
                        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mt-1"
                      >
                        <Phone className="h-4 w-4" />
                        {location.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Otros canales</h3>

              <a
                href="mailto:opticamorea@gmail.com"
                className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:border-primary/50 transition-colors"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">opticamorea@gmail.com</span>
              </a>

              <a
                href="https://instagram.com/opticamorea"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:border-primary/50 transition-colors"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FiInstagram className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">@opticamorea</span>
              </a>
            </div>

            <div className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Horario de Atencion</p>
                <p className="text-muted-foreground text-sm">Lunes a Viernes: 8:30 a 12:30 - 16:00 a 20:00</p>
                <p className="text-muted-foreground text-sm">Sabados: 9:00 a 12:30 - 16:30 a 20:00</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background rounded-2xl p-8 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Envianos un mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nombre
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-card border-border"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-card border-border"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Tu mensaje..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-card border-border resize-none"
                />
              </div>
              <Button loading={loading} type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Enviar Mensaje
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
            {open && <Alert variant={alertSeverity} className=" mt-8 max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
              <AlertTriangleIcon />
              <AlertTitle>Envio de mensaje</AlertTitle>
              <AlertDescription>
                {alertMessage}
              </AlertDescription>
            </Alert>}
          </div>
        </div>
      </div>


    </section>
  )
}
