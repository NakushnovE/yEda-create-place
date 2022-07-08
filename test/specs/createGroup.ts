import { assert } from "console"


describe("Create place", () => {
    /*it("create group", async () => {
        
        await browser.url("https://admin.eda.tst.yandex-team.ru/place_groups/add")
        await $('#username').setValue('admin@yandex-team.ru')
        await $('#password').setValue('password')
        await $('button[name=_submit]').click()

        await $('#place_group_name').setValue('test-name')
        await $('#place_group_organizationId').setValue('1')

        await $('#place_group_menuParserName').selectByVisibleText('Retail API')
        await $('#place_group_integrationEngine').selectByVisibleText('Yandex.Eda API')
        await $('#place_group_stopListAggregator').selectByVisibleText('Raiden API Single Place')
        await $('#place_group_integrationProcessToUseClientCategories').selectByVisibleText('Да')
        await $('#place_group_useClientCategoriesSynchronizationWithMenu').click()

        await $('#place_group_vendorHost').setValue('host order')
        await $('#place_group_clientId').setValue('clientId')
        await $('#place_group_clientSecret').setValue('clientSecret')
        await $('#place_group_scope').setValue('read write')
        await $('#place_group_orderUpdate').click()
        await $('#place_group_cookedStatuses').selectByVisibleText('Заказ приготовлен / READY')
        await $('#place_group_canceledStatuses').selectByVisibleText('Заказ отменен / CANCELLED')
        await $('#place_group_apiVersion').selectByVisibleText('V2')
        await $('#place_group_shouldUpdateCatchweightOrder').click()
        await $('#place_group_dontStopUpdateOrderWithoutItem').click()

        await $('#place_group_menuParserClientId').setValue('clientId')
        await $('#place_group_menuParserClientSecret').setValue('clientSecret')
        await $('#place_group_menuParserScope').setValue('read write')
        await $('#place_group_menuParserVendorHost').setValue('host parser menu')
        await $('#place_group_menuParserMoveDishesToOthersCategory').click()
        await $('#place_group_menuParserSupportPricesWithCoins').click()
        await $('#place_group_menuParserSupportCatchWeightGoods').click()
        await $('#place_group_menuParserApiVersion').selectByVisibleText('V1')
        
        //await browser.pause(20000)
    })*/

    /*
    it("create brend", async () => {
        
        await browser.url("https://admin.eda.tst.yandex-team.ru/brands/add")
        await $('#username').setValue('admin@yandex-team.ru')
        await $('#password').setValue('password')
        await $('button[name=_submit]').click()
       
        await $('#brand_name').setValue('test-name-brend')
        await $('#brand_businessType').selectByVisibleText('Магазин (сборка партнёра)')
        await $('.select2-selection__choice__remove').click()
          
        await $('.//li[contains(text(), "Магазин")]').click()
        await $('#brand_isStockSupported').click()

        await $('#brand_categoryType').selectByVisibleText('Клиентские категории')
        await $('#brand_bitSettings_shouldSynchronizeToNomenclatureService').click()

        
    })*/

    it("create place", async () => {
        
        await browser.url("https://admin.eda.tst.yandex-team.ru/places/add")
        await $('#username').setValue('admin@yandex-team.ru')
        await $('#password').setValue('password')
        await $('button[name=_submit]').click()

        await $('#name').setValue('name-place')
        await $('#country').selectByVisibleText('Российская Федерация')

        const region = await $('#region > option:nth-child(2)')
        await region.waitForDisplayed(3000, true);
        
        await $('#region').selectByVisibleText('Москва')
        // Ввести созданный ранее бренд
        await $('#bitSettings_allowAutoGeneratedZones').click()
        await $('#bitSettings_pickupEnabled').click()
        //по умолчанию наш тип доставки, но потом переделать с выбором
        /*
        await $('.//select[@id="address_input"]/following-sibling::span').click()
        await $('.select2-search.select2-search--dropdown > input').setValue("Россия, Москва, улица Гарибальди, 4Г")
        await $('#select2-address_input-results > li.select2-results__option.select2-results__option--highlighted').click()

        await $('#phoneNumbers_0_phone_number').setValue("+73030303030")
        await $('#phoneNumbers_0_type').selectByVisibleText("Автообзвон")
        // Ввести созданную ранее группу
        //Ввести id магазина  await $('#originId').setValue("{originId}")
        await $('#rating').setValue("3,0")

        await $('.//select[@id="sales"]/following-sibling::span').click()
        await $('/html/body/span/span/span[1]/input').setValue("default_sales")
        await $('#select2-sales-results').$('./li[contains(text(), "default_sales")]').click()
        */
        await $('.//a[@href="#legal-info"]').click()

        await $('#billing_inn').waitForDisplayed(3000, true);
        await $('#billing_inn').setValue("7731586383")
        await $('.//a[@href="/places/billing/ajax/persons-listing/:inn/:deliveryType"]').click()
        
        await $('.//a[@data-place-id="2"]').click()
        await $('#billing_contractType').selectByVisibleText("Договор")


        //await assert($('#select2-address_input-container').isDisplayed)
        
        
    })
    let placeId = 198;
    const todey = new Date
    const year = todey.getFullYear()
    const month = todey.getMonth()
    const date = todey.getDate()
    const hours = (todey.getHours() - 2) //отнримаем часы для вступления комиссиии в силу
    const minutes = todey.getMinutes()

    const zero = (x) => {
    return x < 10 ? x = 0 : x = ""
    }
    const dateForCommission = `${zero(date)}${date}.${zero(month)}${month}.${year} ${zero(hours)}${hours}:${zero(minutes)}${minutes}`

    it("create place", async () => {

        await browser.url(`https://admin.eda.tst.yandex-team.ru/places/${placeId}/edit`)

        await $('.//a[@href="#commission"]').click()
        await browser.pause(5000)
        await $('#place_commission__percent_commission').setValue('10')
        //await $('#place_commission__available_from').selectByVisibleText("08.07.2022 00:30")
        const dataPiker = $('#place_commission__available_from')
        await dataPiker.click()
        await browser.keys('Backspace')
        await browser.pause(5000)
        await $('#place_commission__available_from').click()
        await $('#place_commission__percent_acquiring_commission').click() //выделил рандомное поля чтоб убрать датапикет
        await browser.pause(7000)
        await $('.btn.btn-success.js-place-commission-create.float-right').click()
        await $('.//button[@class="btn btn-success"]').click()



        await browser.pause(2000)
    })
})