import { usePermittedWebsiteStore } from '@/store/permittedWebsites.store';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator,Linking,Modal} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { logout } from '../../API/loginapi';
import { useRef, useState } from 'react'
import { WebView } from 'react-native-webview'

/* ---------------------------------- theme ---------------------------------- */

type TintKey = 'blue' | 'orange' | 'teal' | 'violet' | 'red' | 'green'

const TINTS: Record<TintKey, { bg: string; fg: string }> = {
  blue:   { bg: '#EAF2FF', fg: '#2A628F' },
  orange: { bg: '#FFF3E6', fg: '#C05621' },
  teal:   { bg: '#E4F7F2', fg: '#0F9D8F' },
  violet: { bg: '#F1ECFE', fg: '#6D4FC2' },
  red:    { bg: '#FDECEC', fg: '#C43D3D' },
  green:  { bg: '#E9F7EC', fg: '#1E8E4E' },
}

const TEXT_PRIMARY = '#0B1526'
const TEXT_SECONDARY = '#334155'
const TEXT_MUTED = '#667085'
const TEXT_FAINT = '#98A2B3'
const CARD_BORDER = '#E5E8EC'
const HAIRLINE = StyleSheet.hairlineWidth

const cardShadow = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.05,
  shadowRadius: 10,
  elevation: 2,
}

/* ------------------------------ site metadata ------------------------------ */

const SITE_META: Record<string, { icon: any; tint: TintKey }> = {
  kolkata: { icon: 'business-outline', tint: 'blue' },
  africa:  { icon: 'globe-outline',    tint: 'teal' },
  indore:  { icon: 'factory-outline',  tint: 'orange' },
}

const TINT_CYCLE: TintKey[] = ['blue', 'teal', 'orange', 'violet', 'green', 'red']

function metaFor(code: string, index: number): { icon: any; tint: TintKey } {
  return (
    SITE_META[code.toLowerCase()] ?? {
      icon: 'location-outline',
      tint: TINT_CYCLE[index % TINT_CYCLE.length],
    }
  )
}

function hostOf(url: string): string {
  return url.replace(/^https?:\/\//, '').split('/')[0]
}

/* ------------------------------ active site type ---------------------------- */

type ActiveSite = {
  name: string
  url: string
  code: string
  icon: any
  tint: TintKey
}

/* ---------------------------- webview browser modal ------------------------- */

function SiteWebViewModal({
  site,
  visible,
  onClose,
}: {
  site: ActiveSite | null
  visible: boolean
  onClose: () => void
}) {
  const insets = useSafeAreaInsets()
  const webviewRef = useRef<WebView | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [canGoBack, setCanGoBack] = useState(false)

  const colors = site ? TINTS[site.tint] : TINTS.blue

  const handleBack = () => {
    if (canGoBack) {
      webviewRef.current?.goBack()
    } else {
      onClose()
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    setProgress(0)
    webviewRef.current?.reload()
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={handleBack} /* Android hardware back */
    >
      <View style={styles.wvContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {site && (
          <>
            {/* browser chrome header */}
            <View style={[styles.wvHeader, { paddingTop: insets.top + 8 }]}>
              <TouchableOpacity style={styles.headerBtn} onPress={handleBack} activeOpacity={0.7}>
                <Ionicons name="chevron-back" size={20} color={TEXT_PRIMARY} />
              </TouchableOpacity>

              <View style={[styles.headerIcon, { backgroundColor: colors.bg }]}>
                <Ionicons name={site.icon} size={15} color={colors.fg} />
              </View>

              <View style={styles.headerText}>
                <Text style={styles.headerTitle} numberOfLines={1}>
                  {site.name}
                </Text>
                <Text style={styles.headerSub} numberOfLines={1}>
                  {hostOf(site.url)}
                </Text>
              </View>

              <TouchableOpacity style={styles.headerBtn} onPress={handleRefresh} activeOpacity={0.7}>
                <Ionicons name="refresh-outline" size={18} color={TEXT_PRIMARY} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerBtn}
                onPress={() => Linking.openURL(site.url)}
                activeOpacity={0.7}
              >
                <Ionicons name="open-outline" size={18} color={TEXT_PRIMARY} />
              </TouchableOpacity>
            </View>

            {/* loading progress bar */}
            <View style={styles.progressTrack}>
              {progress < 1 && (
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progress * 100}%`, backgroundColor: colors.fg },
                  ]}
                />
              )}
            </View>

            {/* the website */}
            <WebView
              ref={webviewRef}
              source={{ uri: site.url }}
              startInLoadingState
              javaScriptEnabled
              domStorageEnabled
              sharedCookiesEnabled        /* iOS: share app cookies with webview */
              thirdPartyCookiesEnabled    /* Android: allow 3rd-party cookies */
              allowsInlineMediaPlayback
              showsHorizontalScrollIndicator={false}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onLoadProgress={(e) => setProgress(e.nativeEvent.progress)}
              onNavigationStateChange={(nav) => setCanGoBack(nav.canGoBack)}
              renderLoading={() => (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color={colors.fg} />
                  <Text style={styles.loadingText}>{site.name}</Text>
                </View>
              )}
              renderError={(domain, errorCode) => (
                <View style={styles.errorView}>
                  <Ionicons name="cloud-offline-outline" size={42} color={TEXT_FAINT} />
                  <Text style={styles.errorTitle}>Couldn't load this page</Text>
                  <Text style={styles.errorText}>
                    {domain} · code {errorCode}
                  </Text>
                  <TouchableOpacity style={styles.retryButton} onPress={handleRefresh} activeOpacity={0.8}>
                    <Ionicons name="refresh-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.retryText}>Retry</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </>
        )}
      </View>
    </Modal>
  )
}

/* -------------------------------- site card -------------------------------- */

interface SiteCardProps {
  name: string
  userName: string
  code: string
  icon: any
  tint: TintKey
  onPress: () => void
}

function SiteCard({ name, userName, code, icon, tint, onPress }: SiteCardProps) {
  const colors = TINTS[tint]

  return (
    <TouchableOpacity style={styles.siteCard} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.siteIconWrap, { backgroundColor: colors.bg }]}>
        <Ionicons name={icon} size={20} color={colors.fg} />
      </View>

      <View style={styles.siteText}>
        <Text style={styles.siteName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.siteUser} numberOfLines={1}>
          {userName}
        </Text>
      </View>

      <View style={styles.codeChip}>
        <Text style={styles.codeChipText}>{code}</Text>
      </View>

      <Ionicons name="chevron-forward" size={16} color={TEXT_FAINT} style={{ marginLeft: 8 }} />
    </TouchableOpacity>
  )
}

/* -------------------------------- component -------------------------------- */

export default function Sites() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const permittedWebsites = usePermittedWebsiteStore((s) => s.permittedWebsites)

  const [activeSite, setActiveSite] = useState<ActiveSite | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openSite = (site: ActiveSite) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveSite(site)
    setModalVisible(true)
  }

  const closeWebView = () => {
    setModalVisible(false)
    /* unmount webview after slide-out animation to free memory */
    closeTimer.current = setTimeout(() => setActiveSite(null), 400)
  }

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6F8" />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* header */}
        <Text style={styles.title}>Sites</Text>
        <Text style={styles.subtitle}>Access your permitted locations</Text>

        {/* section header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Permitted Locations</Text>
          <View style={styles.countChip}>
            <Text style={styles.countChipText}>{permittedWebsites.length}</Text>
          </View>
        </View>

        {/* dynamic site list */}
        {permittedWebsites.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={[styles.emptyIconWrap, { backgroundColor: TINTS.blue.bg }]}>
              <Ionicons name="lock-closed-outline" size={22} color={TINTS.blue.fg} />
            </View>
            <Text style={styles.emptyTitle}>No sites available</Text>
            <Text style={styles.emptyText}>
              You don't have permission to any location yet.{'\n'}Contact your administrator.
            </Text>
          </View>
        ) : (
          <View style={styles.sitesContainer}>
            {permittedWebsites.map((entry, index) => {
              const site = entry.permittedWebsite
              const meta = metaFor(site.code, index)

              return (
                <SiteCard
                  key={`${site.code}-${index}`}
                  name={site.name}
                  userName={entry.siteUserName}
                  code={site.code}
                  icon={meta.icon}
                  tint={meta.tint}
                  onPress={() =>
                    openSite({
                      name: site.name,
                      url: site.url,
                      code: site.code,
                      icon: meta.icon,
                      tint: meta.tint,
                    })
                  }
                />
              )
            })}
          </View>
        )}

        {/* sign out */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={18} color={TINTS.red.fg} />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* in-app browser */}
      <SiteWebViewModal site={activeSite} visible={modalVisible} onClose={closeWebView} />
    </View>
  )
}

/* ---------------------------------- styles --------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  scrollContent: {
    padding: 20,
  },

  /* header */
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.6,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_MUTED,
    marginBottom: 24,
  },

  /* section header */
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_MUTED,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  countChip: {
    backgroundColor: '#E9EDF2',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 24,
    alignItems: 'center',
  },
  countChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: TEXT_MUTED,
  },

  /* site cards */
  sitesContainer: {
    gap: 10,
    marginBottom: 28,
  },
  siteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: HAIRLINE,
    borderColor: CARD_BORDER,
    ...cardShadow,
  },
  siteIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  siteText: {
    flex: 1,
    marginRight: 8,
  },
  siteName: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
  },
  siteUser: {
    fontSize: 12,
    fontWeight: '500',
    color: TEXT_MUTED,
    marginTop: 2,
  },
  codeChip: {
    backgroundColor: '#F2F4F7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  codeChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_MUTED,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },

  /* empty state */
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: HAIRLINE,
    borderColor: CARD_BORDER,
    marginBottom: 28,
    ...cardShadow,
  },
  emptyIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    fontWeight: '500',
    color: TEXT_MUTED,
    textAlign: 'center',
    lineHeight: 19,
  },

  /* sign out */
  logoutButton: {
    backgroundColor: TINTS.red.bg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: HAIRLINE,
    borderColor: '#F5C9C9',
  },
  logoutButtonText: {
    color: TINTS.red.fg,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  /* ---------- webview browser ---------- */
  wvContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wvHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: HAIRLINE,
    borderBottomColor: CARD_BORDER,
  },
  headerBtn: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#F2F4F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  headerIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
  },
  headerSub: {
    fontSize: 11,
    fontWeight: '500',
    color: TEXT_MUTED,
    marginTop: 1,
  },
  progressTrack: {
    height: 2,
    backgroundColor: '#F2F4F7',
    overflow: 'hidden',
  },
  progressFill: {
    height: 2,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_MUTED,
  },
  errorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#FBFCFD',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginTop: 14,
  },
  errorText: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginTop: 4,
    marginBottom: 18,
    textAlign: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: TEXT_PRIMARY,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
})