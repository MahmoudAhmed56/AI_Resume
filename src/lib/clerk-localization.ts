// lib/clerk-localization.ts
import { enUS, arSA } from "@clerk/localizations";
import type { DeepPartial, LocalizationResource } from "@clerk/types";

export const clerkLocalization: Record<string, DeepPartial<LocalizationResource>> = {
  en: enUS,
  ar: {
    ...arSA,
    socialButtonsBlockButton: "المتابعة باستخدام {{provider}}",
    formButtonPrimary: "متابعة",
    formButtonPrimary__verify: "تحقق",
    // formButtonPrimary__continue: "متابعة",
    // formButtonPrimary__finish: "إنهاء",
    // formButtonReset: "إلغاء",
    footerActionLink__useAnotherMethod: "استخدم طريقة أخرى",
    dividerText: "أو",
    badge__default: "افتراضي",
    badge__otherImpersonatorDevice: "جهاز محاكاة آخر",
    badge__primary: "رئيسي",
    badge__requiresAction: "يتطلب إجراء",
    badge__thisDevice: "هذا الجهاز",
    badge__unverified: "غير مُتحقق منه",
    badge__userDevice: "جهاز المستخدم",
    badge__you: "أنت",

    // Sign In
    signIn: {
      start: {
        title: "مرحبًا بعودتك",
        subtitle: "للمتابعة إلى حسابك",
        actionText: "ليس لديك حساب؟",
        actionLink: "سجل الآن"
      },
      password: {
        title: "أدخل كلمة المرور",
        subtitle: "للمتابعة إلى حسابك"
      },
      forgotPasswordAlternativeMethods: {
        title: "نسيت كلمة المرور؟",
        label__alternativeMethods: "أو سجل الدخول بطريقة أخرى"
      }
    } as DeepPartial<LocalizationResource['signIn']>,

    // Sign Up
    signUp: {
      start: {
        title: "إنشاء حساب",
        subtitle: "للمتابعة إلى حسابك الجديد",
        actionText: "لديك حساب بالفعل؟",
        actionLink: "تسجيل الدخول"
      },
      emailCode: {
        title: "تحقق من بريدك الإلكتروني",
        subtitle: "للمتابعة إلى حسابك الجديد"
      }
    } as DeepPartial<LocalizationResource['signUp']>,

    // User Profile
    userProfile: {
      profilePage: {
        title: "الملف الشخصي",
        subtitle: "إدارة معلومات حسابك",
      },
      passwordPage: {
        title: "تغيير كلمة المرور",
        subtitle: "تحديث كلمة المرور الخاصة بك",
        successMessage: "تم تحديث كلمة المرور بنجاح",
        changePasswordTitle: "كلمة المرور الجديدة"
      },
      deletePage: {
        title: "حذف الحساب",
        subtitle: "سيتم حذف حسابك بشكل دائم",
        actionDescription: "اكتب 'حذف الحساب' أدناه للمتابعة",
        confirm: "حذف الحساب"
      },
      mfaPage: {
        title: "التحقق بخطوتين",
        subtitle: "تعزيز أمان حسابك",
        formHint: "اختر طريقة التحقق"
      }
    } as DeepPartial<LocalizationResource['userProfile']>,

    // Form Fields
    formFieldLabel__emailAddress: "البريد الإلكتروني",
    formFieldLabel__emailAddress_username: "البريد الإلكتروني أو اسم المستخدم",
    formFieldLabel__password: "كلمة المرور",
    formFieldLabel__currentPassword: "كلمة المرور الحالية",
    formFieldLabel__newPassword: "كلمة مرور جديدة",
    formFieldLabel__confirmPassword: "تأكيد كلمة المرور",
    formFieldLabel__firstName: "الاسم الأول",
    formFieldLabel__lastName: "الاسم الأخير",
    formFieldLabel__username: "اسم المستخدم",
    formFieldLabel__phoneNumber: "رقم الهاتف",
    formFieldLabel__backupCode: "رمز النسخ الاحتياطي",

    // Errors
    formFieldError__matchingPasswords: "كلمات المرور متطابقة",
    formFieldError__notMatchingPasswords: "كلمات المرور غير متطابقة",
    formFieldError__verificationLinkExpired: "انتهت صلاحية رابط التحقق",
    
    // Verification
    // verificationLinkExpired: {
    //   title: "انتهت صلاحية رابط التحقق",
    //   subtitle: "ارجع إلى التبويب الأصلي للمتابعة"
    // },

    // Footer Links
    footerPageLink__help: "مساعدة",
    footerPageLink__privacy: "سياسة الخصوصية",
    footerPageLink__terms: "الشروط والأحكام",

    // Organization
    organizationSwitcher: {
      action__createOrganization: "إنشاء منظمة",
      action__manageOrganization: "إدارة المنظمة"
    },

    // MFA
    // mfaPage: {
    //   title: "التحقق بخطوتين",
    //   subtitle: "تعزيز أمان حسابك"
    // },

    // Dates
    dates: {
      lastDay: "أمس في {{ date | timeString('ar') }}",
      // previous7Days: "الأسبوع الماضي في {{ date | timeString('ar') }}",
      // previous30Days: "الشهر الماضي في {{ date | timeString('ar') }}"
    },

    // Common
    backButton: "رجوع",
    unstable__errors: {
      form_identifier_not_found: "المستخدم غير موجود",
      form_password_incorrect: "كلمة المرور غير صحيحة"
    }
  } satisfies DeepPartial<LocalizationResource>
};

export type SupportedLocales = keyof typeof clerkLocalization;