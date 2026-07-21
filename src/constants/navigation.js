import {
  TodayNavIcon,
  MyDataNavIcon,
  MyMealNavIcon,
  KnowledgeHubNavIcon,
  MyAccountIcon,
  ProfileDetailsIcon,
  SettingsIcon,
  YourPlanIcon,
  PaymentMethodIcon,
  PaymentHistoryIcon,
  SignOutIcon,
  DateTimeIcon,
  UnitsIcon,
  NotificationIcon,
  ConnectedDevicesIcon,
} from "../components/svg";

export const navigationItems = [
  {
    label: "Today",
    path: "/today",
    icon: TodayNavIcon,
  },

  {
    label: "My Data",
    path: "/my-data",
    icon: MyDataNavIcon,
  },

  {
    label: "My Meals",
    path: "/my-meals",
    icon: MyMealNavIcon,
  },

  {
    label: "Knowledge Hub",
    path: "/knowledge-hub",
    icon: KnowledgeHubNavIcon,
  },

  {
    label: "My Account",
    icon: MyAccountIcon,

    children: [
      {
        label: "Profile Details",
        path: "/my-account/profile-details",
        icon: ProfileDetailsIcon,
      },

      {
        label: "Your Plan",
        path: "/my-account/your-plan",
        icon: YourPlanIcon,
      },

      {
        label: "Payment Method",
        path: "/my-account/payment-method",
        icon: PaymentMethodIcon,
      },

      {
        label: "Payment History",
        path: "/my-account/payment-history",
        icon: PaymentHistoryIcon,
      },

      {
        label: "Sign Out",
        action: "logout",
        icon: SignOutIcon,
      },
    ],
  },

  {
    label: "Settings",
    icon: SettingsIcon,

    children: [
      {
        label: "Date & Time",
        path: "/settings/date-time",
        icon: DateTimeIcon,
      },

      {
        label: "Units",
        path: "/settings/units",
        icon: UnitsIcon,
      },

      {
        label: "Notifications",
        path: "/settings/notifications",
        icon: NotificationIcon,
      },

      {
        label: "Connected Devices",
        path: "/settings/connected-devices",
        icon: ConnectedDevicesIcon,
      },
    ],
  },
];
