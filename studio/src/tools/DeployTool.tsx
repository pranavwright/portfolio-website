import React, {useState, useEffect} from 'react'
import {
  Card,
  Stack,
  Text,
  Heading,
  Button,
  TextInput,
  Badge,
  Box,
  Flex,
  Code,
} from '@sanity/ui'
import {RocketIcon, CheckmarkCircleIcon, WarningOutlineIcon, SyncIcon} from '@sanity/icons'

const DEFAULT_DEPLOY_HOOK =
  process.env.SANITY_STUDIO_CLOUDFLARE_DEPLOY_HOOK || ''

export function DeployTool() {
  const [deployHook, setDeployHook] = useState(DEFAULT_DEPLOY_HOOK)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')
  const [lastDeployed, setLastDeployed] = useState<string | null>(null)

  useEffect(() => {
    const savedHook = localStorage.getItem('cf_pages_deploy_hook')
    if (savedHook) {
      setDeployHook(savedHook)
    }
    const savedTime = localStorage.getItem('cf_pages_last_deploy')
    if (savedTime) {
      setLastDeployed(savedTime)
    }
  }, [])

  const handleSaveHook = (value: string) => {
    setDeployHook(value)
    localStorage.setItem('cf_pages_deploy_hook', value)
  }

  const handleDeploy = async () => {
    if (!deployHook.trim()) {
      setStatus('error')
      setMessage('Please provide a valid Cloudflare Pages Deploy Hook URL.')
      return
    }

    setStatus('loading')
    setMessage('Dispatching deploy request to Cloudflare Pages...')

    try {
      const response = await fetch(deployHook.trim(), {
        method: 'POST',
      })

      if (response.ok) {
        const now = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        setStatus('success')
        setMessage(`Deployment successfully triggered at ${now}! Cloudflare Pages is now building your site.`)
        setLastDeployed(now)
        localStorage.setItem('cf_pages_last_deploy', now)
      } else {
        setStatus('error')
        setMessage(`Cloudflare returned status code ${response.status}. Please check your deploy hook URL.`)
      }
    } catch (err: any) {
      setStatus('error')
      setMessage(
        err?.message ||
          'Network error triggering deploy hook. (Note: Cloudflare Deploy Hooks require POST requests and may need CORS allowance, or use GitHub Actions debounced dispatch).'
      )
    }
  }

  return (
    <Box padding={[3, 4, 5]} style={{maxWidth: '820px', margin: '0 auto'}}>
      <Stack space={4}>
        <Card padding={4} radius={3} shadow={1} tone="primary">
          <Flex align="center" gap={3}>
            <RocketIcon style={{fontSize: 28}} />
            <Box flex={1}>
              <Heading size={2}>Cloudflare Pages Deployment Hub</Heading>
              <Text size={1} muted style={{marginTop: 4}}>
                Trigger on-demand production deployments and manage your batch deploy queue.
              </Text>
            </Box>
            <Badge tone="positive" fontSize={1} padding={2}>
              Production Ready
            </Badge>
          </Flex>
        </Card>

        <Card padding={4} radius={3} shadow={1}>
          <Stack space={4}>
            <Heading size={1}>1. On-Demand Deployment</Heading>
            <Text size={1} muted>
              Make as many edits across projects, profile, skills, and timeline as you like. When you are completely done with all your edits, click below to trigger a single consolidated production build.
            </Text>

            <Box>
              <Text size={1} weight="semibold" style={{marginBottom: 8}}>
                Cloudflare Pages Deploy Hook URL:
              </Text>
              <TextInput
                value={deployHook}
                placeholder="https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/..."
                onChange={(e) => handleSaveHook(e.currentTarget.value)}
              />
              <Text size={0} muted style={{marginTop: 6}}>
                Found in: Cloudflare Dashboard → Workers & Pages → pranavwright → Settings → Builds & deployments → Deploy hooks.
              </Text>
            </Box>

            <Flex gap={3} align="center">
              <Button
                icon={status === 'loading' ? SyncIcon : RocketIcon}
                text={status === 'loading' ? 'Triggering Build...' : 'Deploy to Cloudflare Pages Now'}
                tone="primary"
                onClick={handleDeploy}
                disabled={status === 'loading'}
                padding={[3, 3, 4]}
              />
              {lastDeployed && (
                <Text size={1} muted>
                  Last triggered: <strong>{lastDeployed}</strong>
                </Text>
              )}
            </Flex>

            {status === 'success' && (
              <Card padding={3} radius={2} tone="positive">
                <Flex align="center" gap={2}>
                  <CheckmarkCircleIcon />
                  <Text size={1}>{message}</Text>
                </Flex>
              </Card>
            )}

            {status === 'error' && (
              <Card padding={3} radius={2} tone="caution">
                <Flex align="center" gap={2}>
                  <WarningOutlineIcon />
                  <Text size={1}>{message}</Text>
                </Flex>
              </Card>
            )}
          </Stack>
        </Card>

        <Card padding={4} radius={3} shadow={1}>
          <Stack space={3}>
            <Heading size={1}>2. Automatic Debounced Batch Queue (Option 1)</Heading>
            <Text size={1} muted>
              Prefer fully automated builds? We have configured a GitHub Actions debounce queue (<Code>.github/workflows/deploy-queue.yml</Code>).
            </Text>
            <Text size={1}>
              <strong>How it works:</strong>
            </Text>
            <Stack space={2} paddingLeft={2}>
              <Text size={1} muted>
                • Every time you publish a document in Sanity, an edit event is caught in a <strong>2-minute batch queue</strong>.
              </Text>
              <Text size={1} muted>
                • If you publish another document 30 seconds later, the queue <strong>automatically cancels the previous wait and resets the 2-minute timer</strong>.
              </Text>
              <Text size={1} muted>
                • Once you stop editing and 2 minutes of silence pass, <strong>exactly ONE build</strong> is triggered to Cloudflare Pages.
              </Text>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}
