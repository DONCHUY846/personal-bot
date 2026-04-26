import { Scenes } from 'telegraf';
import { LoginService } from '@/services/auth/login.service';
import { RegisterUserService } from '@/services/auth/register-user.service';

/**
 * Represents the specific state of the registration process within a Wizard.
 * This interface define the temporary data maintained during the registration process for a new user.
 *
 * @property fullNameCandidate - Nombre detectado automáticamente desde Telegram (first_name + last_name)
 * @property fullName - Nombre completo confirmado o proporcionado por el usuario
 * @property email - Dirección de email validada del usuario
 */
export interface RegistrationWizardState {
  fullNameCandidate?: string;
  fullName?: string;
  email?: string;
}

/**
 * Extiende la sesión del Wizard de Telegraf para incluir datos específicos de registro.
 * Esta interfaz permite que el estado del registro persista entre los diferentes
 * pasos del Wizard sin mezclarse con otros posibles estados de la aplicación.
 *
 * @property registration - Estado opcional del proceso de registro del usuario
 */
export interface WizardSessionData extends Scenes.WizardSessionData {
  registration?: RegistrationWizardState;
}

/**
 * Contexto personalizado para el Wizard de registro.
 * Esta interfaz extiende el contexto base de Telegraf para incluir datos específicos de registro.
 *
 * @property session - Sesion de Wizard con datos específicos de registro
 * @property scene - Escena de Wizard con datos específicos de registro
 * @property wizard - Wizard de registro con datos específicos de registro
 * @property botStartedAt - Tiempo en que se botó el bot
 * @property services - Servicios de autenticación y registro
 */
export type MyContext = Scenes.WizardContext<WizardSessionData> & {
  session: Scenes.WizardSession<WizardSessionData>;
  scene: Scenes.SceneContextScene<MyContext, WizardSessionData>;
  wizard: Scenes.WizardContextWizard<MyContext>;
  botStartedAt: string;
  services: {
    loginService: LoginService;
    registerUserService: RegisterUserService;
  };
};
