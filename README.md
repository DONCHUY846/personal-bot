# 🤖 Mi Bot Asistente Personal (Telegram) VaneBot.

Un bot de Telegram multipropósito diseñado para centralizar mi vida digital. Creado para evitar la fricción de saltar entre múltiples aplicaciones de notas, gestores de tareas y diarios. Si se puede escribir, se puede enviar por Telegram.

## 🎯 Motivación

Este proyecto nace de una necesidad personal: **la pereza de usar 5 apps diferentes para gestionar mi día a día**. Quería una única interfaz, rápida y siempre accesible (Telegram), donde pudiera enviar un mensaje y que el sistema supiera automáticamente si es una nota, un recordatorio o una tarea.

### Casos de Uso Principales:
- 📝 **Notas rápidas:** Guardar fragmentos de texto o enlaces importantes.
- ✅ **Gestión de Tareas (To-Dos):** Anotar cosas por hacer y marcarlas como completadas.
- ⏰ **Recordatorios:** Programar alertas para no olvidar eventos o tareas.
- 📖 **Diario Personal:** Registrar pensamientos diarios de forma rápida.
- 🧠 **Cosas que aprendo:** Un log de conocimientos y fragmentos de código.
- 💡 **Ideas Locas:** Un buzón para que no se me escape ninguna idea repentina.

## 🛠️ Stack Tecnológico

- **Entorno:** [Node.js](https://nodejs.org/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Framework de Telegram:** [Telegraf](https://telegraf.js.org/)
- **Linter & Formatter:** ESLint (Flat Config) + Prettier + Knip

## 🏗️ Arquitectura y Patrones de Diseño

El proyecto está construido bajo el enfoque de **Arquitectura por Capas** (Clean Architecture ligera) para separar la lógica de negocio del framework de Telegram, asegurando escalabilidad y facilidad de testing.

Se aplican activamente los siguientes patrones de diseño:
- **Strategy:** Para el enrutamiento limpio de comandos (evitando código espagueti y largos `switch`).
- **State (Scenes de Telegraf):** Para gestionar flujos de conversación complejos o de múltiples pasos (ej. crear un recordatorio paso a paso).
- **Repository:** Para abstraer la persistencia de datos (desacoplando la base de datos de la lógica del bot).
- **Observer:** Para el manejo de eventos transversales, como el registro de logs o notificaciones de errores.

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (v18 o superior recomendado)
- Un token de Bot de Telegram (obtenido a través de [@BotFather](https://t.me/botfather))
