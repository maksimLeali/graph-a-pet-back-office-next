"use client";

import { PlatformScopedPage } from "@/components/donations/PlatformScopedPage";
import { PlatformPermissions } from "@/lib/permissions";

export default function WebhooksPage() {
	return (
		<PlatformScopedPage
			requiredPermission={PlatformPermissions.WEBHOOKS_READ}
			title="Webhook"
			missingBackendDescription="Il backend non espone ancora un tipo WebhookEvent né le operazioni listWebhookEvents e retryWebhookEvent (riservata a platform.webhooks.retry). I retry, quando disponibili, passeranno solo da operazioni backend con conferma esplicita."
		/>
	);
}
