"use client"

import { useState, useEffect } from "react"
import { Save, Bell, Lock, Globe, Palette, Database } from "lucide-react"
import { AdminLayout, Card, Button } from "@/components/admin"
import { useTheme } from "@/contexts/ThemeContext"

const ToggleSwitch = ({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description: string
}) => {
  const { actualTheme } = useTheme()
  const isDark = actualTheme === "dark"

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg ${isDark ? "bg-white/5" : "bg-gray-200"}`}
    >
      <div>
        <h4
          className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {label}
        </h4>
        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isDark ? "focus:ring-offset-[#0B0B1B]" : "focus:ring-offset-gray-200"
        } ${checked ? "bg-[#4920E5]" : isDark ? "bg-gray-600" : "bg-gray-400"}`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`inline-block w-5 h-5 transform rounded-full transition-transform ${
            checked ? "translate-x-6 bg-white" : "translate-x-1 bg-white"
          }`}
        />
        <span className="sr-only">{checked ? "On" : "Off"}</span>
      </button>
    </div>
  )
}

interface AdminSettings {
  siteName: string
  siteUrl: string
  contactEmail: string
  contactPhone: string
  timezone: string
  language: string
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  twoFactorAuth: boolean
  sessionTimeout: string
  primaryColor: string
  autoBackup: boolean
  backupFrequency: string
  retentionPeriod: string
}

function getInitialSettings(): AdminSettings {
  if (typeof window === "undefined") {
    return {
      siteName: "H5 Creative",
      siteUrl: "https://h5creative.com",
      contactEmail: "info@h5creative.com",
      contactPhone: "+62 21 1234 5678",
      timezone: "Asia/Jakarta",
      language: "en",
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      twoFactorAuth: false,
      sessionTimeout: "30",
      primaryColor: "#4920E5",
      autoBackup: true,
      backupFrequency: "daily",
      retentionPeriod: "30",
    }
  }

  const savedSettings = localStorage.getItem("admin-settings")
  if (savedSettings) {
    try {
      const parsed = JSON.parse(savedSettings)
      return {
        siteName: "H5 Creative",
        siteUrl: "https://h5creative.com",
        contactEmail: "info@h5creative.com",
        contactPhone: "+62 21 1234 5678",
        timezone: "Asia/Jakarta",
        language: "en",
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        twoFactorAuth: false,
        sessionTimeout: "30",
        primaryColor: "#4920E5",
        autoBackup: true,
        backupFrequency: "daily",
        retentionPeriod: "30",
        ...parsed,
      }
    } catch (error) {
      console.error("Failed to parse saved settings:", error)
    }
  }

  return {
    siteName: "H5 Creative",
    siteUrl: "https://h5creative.com",
    contactEmail: "info@h5creative.com",
    contactPhone: "+62 21 1234 5678",
    timezone: "Asia/Jakarta",
    language: "en",
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
    sessionTimeout: "30",
    primaryColor: "#4920E5",
    autoBackup: true,
    backupFrequency: "daily",
    retentionPeriod: "30",
  }
}

export default function AdminSettingsPage() {
  const { theme, setTheme, actualTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("general")

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "database", label: "Database", icon: Database },
  ]

  const [settings, setSettings] = useState(getInitialSettings)

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem("admin-settings", JSON.stringify(settings))
    console.log("Settings saved:", settings)
    alert("Settings saved successfully!")
  }

  const handleInputChange = (
    field: keyof AdminSettings,
    value: string | boolean,
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
  }

  const isDark = actualTheme === "dark"

  const inputClasses = `w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none ${
    isDark
      ? "bg-white/5 border border-white/10 text-white placeholder:text-gray-500"
      : "bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400"
  }`

  const labelClasses = `block text-sm font-medium mb-2 ${
    isDark ? "text-gray-300" : "text-gray-700"
  }`

  const selectClasses = `w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#4920E5] focus:border-transparent focus:outline-none ${
    isDark
      ? "bg-white/5 border border-white/10 text-white"
      : "bg-white border border-gray-400 text-gray-900"
  }`

  const selectOptionClasses = isDark
    ? "bg-[#0B0B1B] text-white"
    : "bg-white text-gray-900"

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Settings
            </h1>
            <p className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Manage your application settings
            </p>
          </div>
          <Button onClick={handleSave} icon={<Save className="w-5 h-5" />}>
            Save Changes
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div
              className={`backdrop-blur-sm rounded-[30px] border overflow-hidden ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#4920E5] text-white border-l-4 border-[#4920E5]"
                      : isDark
                        ? "text-gray-300 hover:bg-white/5"
                        : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            {activeTab === "general" && (
              <Card title="General Settings">
                <div className="space-y-6">
                  <div>
                    <label className={labelClasses}>Site Name</label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) =>
                        handleInputChange("siteName", e.target.value)
                      }
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Site URL</label>
                    <input
                      type="url"
                      value={settings.siteUrl}
                      onChange={(e) =>
                        handleInputChange("siteUrl", e.target.value)
                      }
                      className={inputClasses}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Contact Email</label>
                      <input
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) =>
                          handleInputChange("contactEmail", e.target.value)
                        }
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Contact Phone</label>
                      <input
                        type="tel"
                        value={settings.contactPhone}
                        onChange={(e) =>
                          handleInputChange("contactPhone", e.target.value)
                        }
                        className={inputClasses}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) =>
                          handleInputChange("timezone", e.target.value)
                        }
                        className={selectClasses}
                      >
                        <option
                          value="Asia/Jakarta"
                          className={selectOptionClasses}
                        >
                          Asia/Jakarta (UTC+7)
                        </option>
                        <option
                          value="Asia/Singapore"
                          className={selectOptionClasses}
                        >
                          Asia/Singapore (UTC+8)
                        </option>
                        <option value="UTC" className={selectOptionClasses}>
                          UTC (UTC+0)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClasses}>Language</label>
                      <select
                        value={settings.language}
                        onChange={(e) =>
                          handleInputChange("language", e.target.value)
                        }
                        className={selectClasses}
                      >
                        <option value="en" className={selectOptionClasses}>
                          English
                        </option>
                        <option value="id" className={selectOptionClasses}>
                          Indonesian
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card title="Notification Settings">
                <div className="space-y-6">
                  <ToggleSwitch
                    checked={settings.emailNotifications}
                    onChange={(checked) =>
                      handleInputChange("emailNotifications", checked)
                    }
                    label="Email Notifications"
                    description="Receive email notifications for important events"
                  />
                  <ToggleSwitch
                    checked={settings.pushNotifications}
                    onChange={(checked) =>
                      handleInputChange("pushNotifications", checked)
                    }
                    label="Push Notifications"
                    description="Receive push notifications in browser"
                  />
                  <ToggleSwitch
                    checked={settings.smsNotifications}
                    onChange={(checked) =>
                      handleInputChange("smsNotifications", checked)
                    }
                    label="SMS Notifications"
                    description="Receive SMS notifications for urgent alerts"
                  />
                </div>
              </Card>
            )}

            {activeTab === "security" && (
              <Card title="Security Settings">
                <div className="space-y-6">
                  <ToggleSwitch
                    checked={settings.twoFactorAuth}
                    onChange={(checked) =>
                      handleInputChange("twoFactorAuth", checked)
                    }
                    label="Two-Factor Authentication"
                    description="Add an extra layer of security"
                  />
                  <div>
                    <label className={labelClasses}>
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) =>
                        handleInputChange("sessionTimeout", e.target.value)
                      }
                      className={inputClasses}
                    />
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "appearance" && (
              <Card title="Appearance Settings">
                <div className="space-y-6">
                  <div>
                    <label className={labelClasses}>Theme</label>
                    <select
                      value={theme}
                      onChange={(e) =>
                        handleThemeChange(
                          e.target.value as "light" | "dark" | "system",
                        )
                      }
                      className={selectClasses}
                    >
                      <option value="dark" className={selectOptionClasses}>
                        Dark
                      </option>
                      <option value="light" className={selectOptionClasses}>
                        Light
                      </option>
                      <option value="system" className={selectOptionClasses}>
                        System
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Primary Color</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) =>
                          handleInputChange("primaryColor", e.target.value)
                        }
                        className="w-16 h-10 rounded cursor-pointer"
                      />
                      <span
                        className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {settings.primaryColor}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "database" && (
              <Card title="Database Settings">
                <div className="space-y-6">
                  <ToggleSwitch
                    checked={settings.autoBackup}
                    onChange={(checked) =>
                      handleInputChange("autoBackup", checked)
                    }
                    label="Auto Backup"
                    description="Automatically backup database"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Backup Frequency</label>
                      <select
                        value={settings.backupFrequency}
                        onChange={(e) =>
                          handleInputChange("backupFrequency", e.target.value)
                        }
                        className={selectClasses}
                      >
                        <option value="hourly" className={selectOptionClasses}>
                          Hourly
                        </option>
                        <option value="daily" className={selectOptionClasses}>
                          Daily
                        </option>
                        <option value="weekly" className={selectOptionClasses}>
                          Weekly
                        </option>
                        <option value="monthly" className={selectOptionClasses}>
                          Monthly
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClasses}>
                        Retention Period (days)
                      </label>
                      <input
                        type="number"
                        value={settings.retentionPeriod}
                        onChange={(e) =>
                          handleInputChange("retentionPeriod", e.target.value)
                        }
                        className={inputClasses}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
