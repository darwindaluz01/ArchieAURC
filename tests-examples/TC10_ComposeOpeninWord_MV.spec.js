import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains, OpeninWord } from '../variables/credentials.js';

test('Archie Compose - Write an email or letter - Create Letter From Draft', async ({ page }) => {
    test.setTimeout(240000);

    const loginPage = new LoginPage(page);
    const mattersPage = new MattersPage(page);
    const archiePage = new ArchiePage(page);

    // Login
    //await page.setViewportSize({ width: 1536, height: 864 });
    await loginPage.goto();
    await loginPage.login(sbusername, sbpassword);

    // Matters
    await mattersPage.goto();
    await mattersPage.searchMatter(matternamecontains);
    await mattersPage.verifyMenus();
    await mattersPage.openArchie();

    await page.getByRole('button', { name: 'Archie' }).click();
await page.waitForTimeout(5000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Compose' }).click();
  
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Letter' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Select a recipient' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Martin Kumagdin (Adoptor)').click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Draft a letter to Martin Kumagdin    Create a letter containing important matter details');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();

  await page.waitForTimeout(15000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('button:nth-child(5)').click();


  
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Create in Web' }).click();

  /*
  const page2 = await page2Promise;
  await page2.goto('https://smokeballus-my.sharepoint.com/:w:/r/personal/darwin_daluz_smokeball_com/_layouts/15/Doc.aspx?sourcedoc=%7B77C1A14D-1F12-442E-8AE0-4618E0C56C98%7D&file=Letter%20to%20Martin%20Kumagdin21.docx&action=default&mobileredirect=true');
  await page2.locator('iframe[name="WacFrame_Word_0"]').contentFrame().getByRole('tab', { name: 'Smokeball - Staging' }).click();
  await page2.locator('iframe[name="WacFrame_Word_0"]').contentFrame().getByRole('button', { name: 'Show Details' }).click();
  await page2.locator('iframe[name="WacFrame_Word_0"]').contentFrame().locator('iframe[name="{\\"baseFrameName\\":\\"_xdm_0_https://smokeballus-my.sharepoint.com/personal/darwin_daluz_smokeball_com/Documents/Apps/Smokeball Staging/7f/720cbf-9264-4cc6-aa09-b231f977098f/Letter to Martin Kumagdin21.docx_{4ce3c250-ac17-41f2-9853-6eaea3c306c5}{1}b028f394_ad03c0a9_1760310652939\\",\\"hostInfo\\":\\"Word|Web|16.00|EN-US|bdbf60ce-9b91-bb7c-9015-d0c4021e6a8e|||0\\",\\"xdmInfo\\":\\"ee97b2aa_5f4e2cf4_1760310652939|{4ce3c250-ac17-41f2-9853-6eaea3c306c5}{1}|https://usc-word-edit.officeapps.live.com\\",\\"flights\\":\\"[2,22,\\\\\\"Microsoft.Office.SharedOnline.InsertionDialogFixesEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.NewBackstageEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.AgaveAuthContextApiEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.MosForWXPEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.EnableMsal3SsoApi\\\\\\"]\\",\\"disabledChangeGates\\":\\"[\\\\\\"Microsoft.Office.SharedOnline.WacOauthScriptLoadLoggingEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.UseCopilotEntrypointForDeckGen\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.CanaryChangeGate\\\\\\",\\\\\\"embeddedCitationsEnabled\\\\\\",\\\\\\"OfficeVSO:8731602_UnifyOfficeCommonStringsUsage\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.OfficeVSO_8756711_EnableModifyingFontStylesGalleryHeight\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.OfficeVSO:8906614_RemoveListLevelFromStyle\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.OfficeVSO_8337214_TrackChangesReplaceFixEnabled\\\\\\",\\\\\\"OfficeVSO:8949380_ListBootPerfTrackerEnabled\\\\\\",\\\\\\"OfficeVSO:8829611_AlwaysLogDuringBootEnabled\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.OfficeVSO_8838664_TenantFilterForDynamicWatermarkingEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.StackScopedSelectorPropIsEnabled\\\\\\",\\\\\\"SSToolBarFullScreenButtonShown\\\\\\",\\\\\\"Microsoft.Office.OneNoteOnline.ChangeGate.isTableSelectionCellPaddingUpdateEnabled\\\\\\",\\\\\\"Microsoft.Office.OneNoteOnline.ChangeGate.IsInsertAudioDuringRecordingEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.EnableStrictUpnChecking\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.RegisterServiceWorker\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.OfficeVSO_9018688_GetHyperlinksInParagraphAssertionFix\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_9196077_OnDemandTokenIsEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.NoHPAEnforcementForPrivateCatalog\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.NoHPAEnforcementForOmexOrgId\\\\\\",\\\\\\"OfficeVSO:9432782_isStkSettingsLoadedCGFixEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_9374681_OnDemandTokenIsEnabled\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.OfficeVSO_9463459_CustomStyleNormalizerFixEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.SkipXmlValidationInTranslationRequest\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.ReInitOAuthOnVisibilityChange\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_9374706_OnDemandTokenIsEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.React18RenderTooltipFixEnabled\\\\\\",\\\\\\"Microsoft.Office.OneNoteOnline.ChangeGate.RegisterSyncStatusIfEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.React18RenderNotificationsFixEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.React18RenderIconFixEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.ShareTrimEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.React18RenderIconFixEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.React18RenderHeaderButtonFixEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.React18RenderNotificationsFixEnabledV2\\\\\\",\\\\\\"SharedOnline.ChangeGate.React18RenderTooltipFixEnabledV2\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_9544738_WaitForPairwiseBrokerInitMessageFromParentFrame\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.CopilotAgentTelSettings\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_9932014_CopilotAgentTelSettings\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_10204644_RemoveTryResolveForSaveStatusUI\\\\\\",\\\\\\"IsNavigationPaneContainerBindEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.TrimWopiSrcUrl\\\\\\",\\\\\\"Microsoft.Office.WordOnline.DeletedMarkerOrphanCommentValidation\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_9385005_EnableSetPolicyLabelHandlerRequest\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.FavoritesEndpointCompletesRequests\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.trackHeightUpdateMechanicalChangeIsEnabled\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.RefactorLegacySaveOfEmbeddedObject\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.FavoritesSynchronousHandler\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.FixHeavilyRotatedGraphics\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.GetBaseDocumentAsyncWorker_DoCAESubsriptionAndNotificationChecksAsync\\\\\\",\\\\\\"Microsoft.Office.Excel.ChangeGate.OfficeVSO:9758051_AddSupportsPivotTableAutoRefreshInEditorsTable\\\\\\"]\\"}"]').contentFrame().getByRole('button', { name: 'icon Save to Matter' }).click();
  await page2.locator('iframe[name="WacFrame_Word_0"]').contentFrame().locator('iframe[name="{\\"baseFrameName\\":\\"_xdm_0_https://smokeballus-my.sharepoint.com/personal/darwin_daluz_smokeball_com/Documents/Apps/Smokeball Staging/7f/720cbf-9264-4cc6-aa09-b231f977098f/Letter to Martin Kumagdin21.docx_119c2c2a-a289-4d2f-b563-0dab99c4aa4d7a0736a2_2705aac0_1760310669690\\",\\"hostInfo\\":\\"Word|Web|16.00|EN-US|bdbf60ce-9b91-bb7c-9015-d0c4021e6a8e|isDialog||0\\",\\"xdmInfo\\":\\"8fe9ed5f_6c0965fc_1760310669690|119c2c2a-a289-4d2f-b563-0dab99c4aa4d|https://usc-word-edit.officeapps.live.com\\",\\"flights\\":\\"[2,22,\\\\\\"Microsoft.Office.SharedOnline.InsertionDialogFixesEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.NewBackstageEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.AgaveAuthContextApiEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.MosForWXPEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.EnableMsal3SsoApi\\\\\\"]\\",\\"disabledChangeGates\\":\\"[\\\\\\"Microsoft.Office.SharedOnline.WacOauthScriptLoadLoggingEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.UseCopilotEntrypointForDeckGen\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.CanaryChangeGate\\\\\\",\\\\\\"embeddedCitationsEnabled\\\\\\",\\\\\\"OfficeVSO:8731602_UnifyOfficeCommonStringsUsage\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.OfficeVSO_8756711_EnableModifyingFontStylesGalleryHeight\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.OfficeVSO:8906614_RemoveListLevelFromStyle\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.OfficeVSO_8337214_TrackChangesReplaceFixEnabled\\\\\\",\\\\\\"OfficeVSO:8949380_ListBootPerfTrackerEnabled\\\\\\",\\\\\\"OfficeVSO:8829611_AlwaysLogDuringBootEnabled\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.OfficeVSO_8838664_TenantFilterForDynamicWatermarkingEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.StackScopedSelectorPropIsEnabled\\\\\\",\\\\\\"SSToolBarFullScreenButtonShown\\\\\\",\\\\\\"Microsoft.Office.OneNoteOnline.ChangeGate.isTableSelectionCellPaddingUpdateEnabled\\\\\\",\\\\\\"Microsoft.Office.OneNoteOnline.ChangeGate.IsInsertAudioDuringRecordingEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.EnableStrictUpnChecking\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.RegisterServiceWorker\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.OfficeVSO_9018688_GetHyperlinksInParagraphAssertionFix\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_9196077_OnDemandTokenIsEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.NoHPAEnforcementForPrivateCatalog\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.NoHPAEnforcementForOmexOrgId\\\\\\",\\\\\\"OfficeVSO:9432782_isStkSettingsLoadedCGFixEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_9374681_OnDemandTokenIsEnabled\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.OfficeVSO_9463459_CustomStyleNormalizerFixEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.SkipXmlValidationInTranslationRequest\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.ReInitOAuthOnVisibilityChange\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_9374706_OnDemandTokenIsEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.React18RenderTooltipFixEnabled\\\\\\",\\\\\\"Microsoft.Office.OneNoteOnline.ChangeGate.RegisterSyncStatusIfEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.React18RenderNotificationsFixEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.React18RenderIconFixEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.ShareTrimEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.React18RenderIconFixEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.React18RenderHeaderButtonFixEnabled\\\\\\",\\\\\\"SharedOnline.ChangeGate.React18RenderNotificationsFixEnabledV2\\\\\\",\\\\\\"SharedOnline.ChangeGate.React18RenderTooltipFixEnabledV2\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_9544738_WaitForPairwiseBrokerInitMessageFromParentFrame\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.CopilotAgentTelSettings\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_9932014_CopilotAgentTelSettings\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_10204644_RemoveTryResolveForSaveStatusUI\\\\\\",\\\\\\"IsNavigationPaneContainerBindEnabled\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.TrimWopiSrcUrl\\\\\\",\\\\\\"Microsoft.Office.WordOnline.DeletedMarkerOrphanCommentValidation\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.OfficeVSO_9385005_EnableSetPolicyLabelHandlerRequest\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.FavoritesEndpointCompletesRequests\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.trackHeightUpdateMechanicalChangeIsEnabled\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.RefactorLegacySaveOfEmbeddedObject\\\\\\",\\\\\\"Microsoft.Office.SharedOnline.ChangeGate.FavoritesSynchronousHandler\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.FixHeavilyRotatedGraphics\\\\\\",\\\\\\"Microsoft.Office.WordOnline.ChangeGate.GetBaseDocumentAsyncWorker_DoCAESubsriptionAndNotificationChecksAsync\\\\\\",\\\\\\"Microsoft.Office.Excel.ChangeGate.OfficeVSO:9758051_AddSupportsPivotTableAutoRefreshInEditorsTable\\\\\\"]\\"}"]').contentFrame().getByRole('button', { name: 'OK' }).click();
  await page2.close();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: 'Documents' }).click();
    /*
    const page1 = await page1Promise;
    await page1.goto('https://smokeballus-my.sharepoint.com/:w:/r/personal/darwin_daluz_smokeball_com/_layouts/15/Doc.aspx?sourcedoc=%7B8789765F-7770-4483-AC71-9436FAF16503%7D&file=Letter%20to%20Martin%20Kumagdin.docx&action=default&mobileredirect=true');
    await page1.locator('iframe[name="WacFrame_Word_0"]').contentFrame().locator('#WACViewPanel_EditingElement').click();
    await page1.locator('iframe[name="WacFrame_Word_0"]').contentFrame().getByRole('tab', { name: 'Smokeball - Staging' }).click();
    await page1.locator('iframe[name="WacFrame_Word_0"]').contentFrame().getByRole('button', { name: 'Show Details' }).click();

    await expect(page1.locator('iframe[name="WacFrame_Word_0"]').contentFrame().locator('#AppForOfficePanel0TaskPaneTitle')).toContainText('Smokeball - Staging');
    await page1.close();
    */


    const page1 = await page1Promise;

    // Wait until the popup has an actual URL (avoid 'about:blank')
    if (!page1.url() || page1.url() === 'about:blank') {
        await page1.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 });
    }

    // Proceed only if SharePoint URL is detected
    if (page1.url().includes('https://smokeballus-my.sharepoint.com/')) {
        console.log('SharePoint page detected:', page1.url());
        await page.waitForTimeout(5000);

        const wacFrame = page1.frameLocator('iframe[name^="WacFrame_Word_"]').first();
        await page.waitForTimeout(5000);

        await wacFrame.getByRole('tab', { name: 'Smokeball - Staging' }).click();
        await page.waitForTimeout(5000);
        await wacFrame.getByRole('button', { name: 'Show Details' }).click();
        await page.waitForTimeout(5000);

        await expect(wacFrame.locator('#AppForOfficePanel0TaskPaneTitle'))
            .toContainText('Smokeball - Staging');

        await page1.close();
    } else {
        console.warn('Unexpected URL, skipping:', page1.url());
        await page1.close();
    }

    await page.screenshot({
        path: OpeninWord,
        fullPage: true
    });

    //await page.getByRole('button', { name: '' }).click();
    await page.locator('button.close-icon').click();


    /*


    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button:nth-child(2)').click();
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Why did you choose this rating? (optional)');
    await page.waitForTimeout(3000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button').first().click();
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Why did you choose this rating? (optional)');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Provide additional feedback..' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Provide additional feedback..' }).fill('This is just a test.');
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Thanks for your feedback!');
    await page.waitForTimeout(3000);

    */

    await page.waitForTimeout(2000);
    console.log('Open in Word');

    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
