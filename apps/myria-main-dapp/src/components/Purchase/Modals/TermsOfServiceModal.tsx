import { Trans } from '@lingui/macro';
import Modal from 'src/components/Modal';
import Input from 'src/components/Input';
import React from 'react';
import Button from 'src/components/core/Button';
import clsx from 'clsx';

const space = 'pl-3 my-3';

const Text = ({ children }: any) => {
  return <p className="my-3">{children}</p>;
};

const TermsOfServiceModal = ({
  open,
  onClose,
  onAgree
}: {
  open: boolean;
  onClose?: () => void;
  onAgree?: () => void;
}) => {
  const [agree, setAgree] = React.useState(false);

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content
        title="Terms & conditions"
        className="z-20 shadow-[0_0_40px_10px_#0000004D] md:max-w-[832px]">
        <div className="py-8">
          <div className="h-96 overflow-y-auto px-8">
            <p className="my-3 text-center font-bold">Metagalactic Jump Ltd.</p>
            <p className="my-3 text-center font-bold">
              <Trans>Product Terms and Conditions</Trans>
            </p>
            <p className="my-3 font-bold">
              <Trans>Last Updated: September 2022</Trans>
            </p>
            <p className="my-3 font-bold">
              <Trans>
                PLEASE CAREFULLY READ THESE TERMS AND CONDITIONS BEFORE MAKING ANY DECISION TO
                PURCHASE PRODUCTS FROM THE COMPANY OR ANY OTHER PERSON AND ACCEPTING THEM AS THEY
                AFFECT YOUR OBLIGATIONS AND LEGAL RIGHTS, INCLUDING, BUT NOT LIMITED TO, WAIVERS OF
                RIGHTS AND LIMITATIONS OF LIABILITY. IF YOU DO NOT AGREE WITH THESE TERMS AND
                CONDITIONS OR IF YOU ARE A PROHIBITED PERSON THEN YOU ARE NOT PERMITTED TO PURCHASE
                THE PRODUCTS FROM THE COMPANY OR ANY OTHER PERSON.
              </Trans>
            </p>
            <p className="my-3 font-bold">
              <Trans>
                BY PURCHASING PRODUCTS FROM THE COMPANY OR ANY OTHER PERSON YOU ACKNOWLEDGE THAT YOU
                HAVE FULLY READ, UNDERSTAND AND IRREVOCABLY ACCEPT AND AGREE TO BE BOUND BY THESE
                TERMS AND CONDITIONS. YOU MUST ALSO MONITOR THE WEBSITE FOR ANY ANNOUNCEMENTS FROM
                THE COMPANY AS THEY MAY ADD TO, OR CHANGE, THESE TERMS AND CONDITIONS FROM TIME TO
                TIME. PLEASE SEE CLAUSE 4 FOR FURTHER INFORMATION.
              </Trans>
            </p>
            <p className="my-3 font-bold">
              <Trans>
                OTHER THAN TO THE EXTENT SET OUT IN THE INFORMATION MATERIALS, THE PRODUCTS DO NOT
                REPRESENT OR CONFER ANY OWNERSHIP RIGHT OR STAKE, SHARE, OR EQUIVALENT RIGHTS, OR
                ANY RIGHT TO RECEIVE INTELLECTUAL PROPERTY RIGHTS IN OR RELATING TO THE PLATFORM,
                THE COMPANY OR ANY AFFILIATE OF THE COMPANY. THE PRODUCTS ARE NOT INTENDED TO BE OR
                TO REPRESENT A STOCK, A LOAN CONTRACT, A COMMODITY, A CURRENCY, A SHARE, AN
                INSTRUMENT CREATING OR ACKNOWLEDGING INDEBTEDNESS, AN INSTRUMENT GIVING ENTITLEMENTS
                TO SECURITIES, A CERTIFICATE REPRESENTING CERTAIN SECURITIES, AN OPTION, A FUTURE OR
                A CONTRACT FOR DIFFERENCE IN THE BRITISH VIRGIN ISLANDS OR IN ANY PERMITTED
                JURISDICTIONS.
              </Trans>
            </p>
            <p className="font-bold">
              <Trans>CLAUSE 1. DEFINITIONS</Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Affiliates”</span>{' '}
              <Trans>
                means with respect to any specified Person, any director, officer, partner, member,
                agent, advisor or employee of such Person and any other Person that, directly or
                indirectly, through one or more intermediaries, controls, is controlled by, or is
                under common control with, such specified Person, and for purposes of this
                definition “control” (including, with correlative meanings, the terms, “controlled
                by” and “under common control with”), as used with respect to any Person, means the
                possession, directly or indirectly, of the power to direct or cause the direction of
                this management or policies of such Person, whether through the ownership of voting
                securities, by contract or otherwise.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Applicable Law”</span>{' '}
              <Trans>
                means the applicable laws, acts, statutes, ordinances, rules, regulations,
                judgments, injunctions, orders, treaties, sanctions, administrative acts and decrees
                of any relevant jurisdiction.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Blockchain”</span>{' '}
              <Trans>
                means a type of distributed ledger, comprised of immutable, digitally recorded, data
                in packages called blocks.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Business Day”</span>{' '}
              <Trans>
                means a day (other than a Saturday or Sunday or public holiday) on which commercial
                banks are open for ordinary business in the British Virgin Islands.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Company”</span>{' '}
              <Trans>
                means Metagalactic Jump Ltd. a British Virgin Islands business company with limited
                liability and having its registered office situated c/o Harkom Corporate Services
                Limited at Jayla Place, P.O. Box 216, Road Town, Tortola, British Virgin Islands.,
                which is the entity initiating the Product Sale and offering the Products for
                purchase in accordance with these T&Cs.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Governmental Authority”</span>{' '}
              <Trans>
                means any nation or government, any state or other political subdivision thereof,
                any entity exercising legislative, judicial or administrative functions of or
                pertaining to government, including, without limitation, any government authority,
                agency, department, board, commission or instrumentality, and any court, tribunal or
                arbitrator(s) of competent jurisdiction, and any self-regulatory organization.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Information Materials”</span>{' '}
              <Trans>
                means documents or other materials issued by any member of the Issuer Group in
                connection with the Products from time to time.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Issuer Group”</span>{' '}
              <Trans>means the Company and each of its Affiliates.</Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Node”</span>{' '}
              <Trans>
                means a cryptographic node that entitles the operator thereof to be a participant on
                the blockchain network that forms a part of the Platform.{' '}
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Parties”</span> <Trans>means the Company and You.</Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Permitted Jurisdiction” </span>{' '}
              <Trans>means a jurisdiction that is not a Prohibited Jurisdiction.</Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Person” </span>{' '}
              <Trans>
                means an individual or legal entity or person, including, without limitation, a
                Governmental Authority or an agency or instrumentality thereof.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Platform” </span>{' '}
              <Trans>
                means the blockchain gaming ecosystem powered by Ethereum L2 infrastructure as
                detailed further in the Information Materials and which is operated through the
                Platform Operator.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Platform Operator”</span>{' '}
              <Trans>
                means Megamoon Platform, a company incorporated in the Cayman Islands, whose
                registered office address is at Harbour Place, 2nd Floor, 103 South Church Street,
                P.O. Box 472, George Town, Grand Cayman KY1-1106, Cayman Islands.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Product” </span> <Trans>means a Token or a Node. </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Product Sale”</span>{' '}
              <Trans>
                means the offering of any Product by the Company to Persons that are not Prohibited
                Persons.{' '}
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Prohibited Jurisdiction”</span>{' '}
              <Trans>means any jurisdiction identified in Schedule 1.</Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Prohibited Person” </span>{' '}
              <Trans>
                means any such Person, as determined by the Company in its sole and absolute
                discretion, that is:
              </Trans>
              <p className="pl-9">
                a.{' '}
                <Trans>
                  a Person unable to pass the Company’s know-your-client requirements as may be
                  determined by the Company from time to time in its sole and absolute discretion;
                </Trans>
              </p>
              <p className="pl-9">
                b. <Trans>a U.S. Person;</Trans>
              </p>
              <p className="pl-9">
                c. <Trans>a member of the public in the British Virgin Islands;</Trans>
              </p>
              <p className="pl-9">
                d.{' '}
                <Trans>
                  a citizen or resident of or located in, or a legal entity formed or incorporated
                  within or subject to the Laws of, a Prohibited Jurisdiction (irrespective of
                  whether use of a virtual private network or other technical workaround to effect
                  such transaction and avoid detection within a Prohibited Jurisdiction);
                </Trans>
              </p>
              <p className="pl-9">
                e.{' '}
                <Trans>
                  an individual or an individual employed by or associated with a legal entity or a
                  legal entity identified on the United States Department of Commerce’s denied
                  persons or entity list, the United States Department of Treasury’s specially
                  designated nationals or blocked persons lists, the United States Department of
                  State’s debarred parties list, the consolidated sanctions list maintained by the
                  United States Department of Treasury’s Office of Foreign Assets Control any United
                  Nations Security Council sanctions lists or any other sanctions list;{' '}
                </Trans>
              </p>
              <p className="pl-9">
                f.{' '}
                <Trans>
                  a Person identified as a terrorist organization on any other relevant lists
                  maintained by any Governmental Authority;{' '}
                </Trans>
              </p>
              <p className="pl-9">
                g.{' '}
                <Trans>
                  a Person acting, directly or indirectly, in contravention of any Applicable Law;
                </Trans>
              </p>
              <p className="pl-9">
                h.{' '}
                <Trans>
                  a Person in any manner limited or prohibited (or that requires licensing,
                  registration or approval of any kind) from the purchasing, possessing,
                  transferring, using or otherwise conducting a transaction involving any amount of
                  Products under Applicable Law;
                </Trans>
              </p>
              <p className="pl-9">
                i.{' '}
                <Trans>
                  a Person that has been involved at any time in any type of activity associated
                  with money laundering or terrorist financing or any other applicable
                  anti-corruption or anti bribery statute or has been subject to any investigation
                  or sanction by, or a request for information from, any Governmental Authority
                  relating to money laundering, terrorist financing, corruption or bribery in any
                  jurisdiction or under any Applicable Law; or
                </Trans>
              </p>
              <p className="pl-9">
                j.{' '}
                <Trans>
                  a Person that is, unless otherwise disclosed in writing to the Company prior to
                  Your taking part in the Product Sale or acquiring Products from any third party, a
                  politically exposed person (“PEP”) as defined by the Financial Action Task Force
                  (or such similar Person under any Applicable Law) as an individual who is or has
                  been entrusted with a prominent public function or an immediate family member or
                  close associate of a PEP or any corporation, business or other entity that has
                  been formed by, or for the benefit of, a PEP or any immediate family member or
                  close associate of a PEP.
                </Trans>
              </p>
            </p>
            <p className="my-3">
              <span className="font-bold">“T&Cs”</span>{' '}
              <Trans>
                means these terms and conditions, including all Information Materials, and any other
                rules, policies or procedures that may be issued by any member of the Issuer Group
                and published from time to time on the Website, as amended from time to time in
                accordance with the provisions herein.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Token”</span>{' '}
              <Trans>
                means the Company’s cryptographic tokens known as $MYRIA tokens, as described
                further in the Information Materials and which operate in connection with the
                Platform which is owned and operated by the Platform Operator. The Company shall
                mint no more than 50,000,000,000 Tokens and shall be made available to (i)
                purchasers of a Node that operate the Node in connection with the Platform; (ii)
                holders of a simple agreement for future Tokens which entitles them to a certain
                number of Tokens; and (iii) such other persons as the Company may determine from
                time to time.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“U.S. Person”</span>{' '}
              <Trans>
                means any one of the following (i) any U.S. Citizen; (ii) any natural person
                resident in the United States of America; (iii) any partnership or corporation
                organized or incorporated under the laws of the United States of America; (iv) any
                estate of which any executor or administrator is a U.S. Person; (v) any trust of
                which any trustee is a U.S. Person; (vi) any agency or branch of a foreign entity
                located in the United States of America; (vii) any non-discretionary account or
                similar account (other than an estate or trust) held by a dealer or other fiduciary
                for the benefit or account of a U.S. Person; (viii) any discretionary account or
                similar account (other than an estate or trust) held by a dealer or other fiduciary
                organized, incorporated or (if an individual) resident in the United States of
                America; and (ix) any partnership or corporation if (a) organized or incorporated
                under the laws of any foreign jurisdiction; and (b) formed by a U.S. Person
                principally for the purpose of investing in securities not registered under the
                Securities Act, unless it is organized or incorporated, and owned, by accredited
                investors (as defined in Rule 501(a) under the Securities Act) who are not natural
                persons, estates or trusts. However, for the avoidance of doubt, the following are
                not a “U.S. Person” (x) any discretionary account or similar account (other than an
                estate or trust) held for the benefit or account of a non-U.S. Person by a dealer or
                other professional fiduciary organized, incorporated, or (if an individual) resident
                in the United States; (xi) any estate of which any professional fiduciary acting as
                executor or administrator is a U.S. Person if (a) an executor or administrator of
                the estate who is not a U.S. Person has sole or shared investment discretion with
                respect to the assets of the estate; and (b) the estate is governed by foreign law;
                (xii) any trust of which any professional fiduciary acting as trustee is a U.S.
                Person, if a trustee who is not a U.S. Person has sole or shared investment
                discretion with respect to the trust assets, and no beneficiary of the trust (and no
                settlor if the trust is revocable) is a U.S. Person; (xiii) an employee benefit plan
                established and administered in accordance with the law of a country other than the
                United States and customary practices and documentation of such country; (xiv) any
                agency or branch of a U.S. Person located outside the United States if (a) the
                agency or branch operates for valid business reasons; and (b) the agency or branch
                is engaged in the business of insurance or banking and is subject to substantive
                insurance or banking regulation, respectively, in the jurisdiction where located;
                and (xv) The International Monetary Fund, the International Bank for Reconstruction
                and Development, the Inter- American Development Bank, the Asian Development Bank,
                the African Development Bank, the United Nations, and their agencies, affiliates and
                pension plans, and any other similar international organizations, their agencies,
                affiliates and pension plans.
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“You”, “Your” or “Yourself”</span>{' '}
              <Trans>
                means any Person who from time to time (i) proposes to acquire Products from the
                Company or any third party; or (ii) holds Products.{' '}
              </Trans>
            </p>
            <p className="my-3">
              <span className="font-bold">“Website”</span>{' '}
              <Trans>
                means any website URL used by the Issuer Group and/or the Platform Operator to
                advertise the Platform and/or Products (as may be updated from time to time).
              </Trans>
            </p>
            <p className="my-3 font-bold">CLAUSE 2. TERMS AND CONDITIONS, STATUS AND ACCEPTANCE</p>
            <p className="my-3">
              2.1{' '}
              <Trans>
                These T&Cs constitute a legally binding obligation on You effective upon the earlier
                to occur of the date and time: (i) You click the check box on the Website to
                indicate that You have read, understand and agree to these T&Cs; (ii) the Company or
                any Affiliate of the Company receives payment for the Products from You; or (iii)
                You receive any Products from the Company, any Affiliate of the Company or from any
                third party.
              </Trans>
            </p>
            <p className="my-3">
              2.2{' '}
              <Trans>
                These T&Cs define the rights and obligations of the Parties in relation to the
                Products and Your purchase and use of the Products.
              </Trans>
            </p>
            <p className="my-3">
              2.3{' '}
              <Trans>
                You must carefully read and agree to comply with these T&Cs before purchasing and/or
                using the Products and/or using the Platform.{' '}
              </Trans>
            </p>
            <p className="my-3">
              2.4{' '}
              <Trans>
                By purchasing Products and/or using the Platform, You are confirming to each member
                of the Issuer Group that You have fully read, understand and irrevocably accept
                these T&Cs. If You do not agree with these T&Cs in general or any part of them or
                have not checked the requisite boxes – after registration fields are completed –
                acknowledging Your review and acceptance of these T&Cs, You are not permitted to use
                the Platform or purchase Products from the Company, any Affiliate of the Company or
                from any third party.{' '}
              </Trans>
            </p>
            <p className="my-3">
              2.5{' '}
              <Trans>
                For the avoidance of doubt, any acceptance of Your offer to purchase Products from
                the Company or any Affiliate of the Company is conditional upon the Company’s
                satisfaction that You have passed all the Company’s relevant anti-money laundering,
                know your client and other checks relating to Your qualifications to purchase
                Products. In the event that Your offer is rejected by the Company or any Affiliate
                of the Company, the cryptocurrencies submitted will be returned to You in the
                original fiat currency or cryptocurrency in which they were received.
              </Trans>
            </p>
            <p className="my-3">
              2.6{' '}
              <Trans>
                You do hereby acknowledge and agree that (i) the Platform will not be owned,
                operated or controlled by the Company; (ii) it is possible that the Platform will
                not be used by a large number of businesses, individuals, and other organizations
                and (iii) there will be limited public interest in the Platform and that such lack
                of interest could negatively impact the Products and the Platform.
              </Trans>
            </p>
            <p className="my-3 font-bold">CLAUSE 3. PURCHASE LIMITATIONS</p>
            <p className="my-3">
              3.1{' '}
              <Trans>
                PRODUCTS ARE ONLY INTENDED FOR THOSE PERSONS WHO ARE KNOWLEDGEABLE AND EXPERIENCED
                IN CRYPTOCURRENCIES, BLOCKCHAIN AND RELATED TECHNOLOGIES AND PROTOCOLS. BY
                PURCHASING, HOLDING, OR USING PRODUCTS, YOU ACKNOWLEDGE THAT TRANSACTIONS USING
                CRYPTOCURRENCIES (INCLUDING CRYPTOGRAPHIC PRODUCTS) ARE INHERENTLY UNSTABLE AND YOU
                AGREE TO ACCEPT THAT RISK, AND AGREE THAT THE COMPANY AND EACH OF ITS AFFILIATES IS
                NOT LIABLE FOR ANY LOSS THAT YOU MAY SUFFER OR INCUR, AND FURTHER ACKNOWLEDGE,
                ACCEPT AND ASSUME ALL RISKS ASSOCIATED WITH THE PRODUCTS AND THE PLATFORM INCLUDING,
                WITHOUT LIMITATION, THOSE IDENTIFIED IN CLAUSE 6 OF THESE T&Cs AND IN THE
                INFORMATION MATERIALS.
              </Trans>
            </p>
            <p className="my-3">
              3.2{' '}
              <Trans>
                PRODUCTS ARE INTENDED TO BE MARKETED, OFFERED AND SOLD ONLY TO PERSONS THAT ARE NOT
                PROHIBITED PERSONS.{' '}
              </Trans>
            </p>
            <p className="my-3">
              3.3{' '}
              <Trans>
                THE MARKETING, OFFERING AND SALE OF PRODUCTS BY THE COMPANY IS EXPRESSLY BEING MADE
                IN THE PERMITTED JURISDICTIONS ON THE BASIS THAT THE PRODUCTS DO NOT REQUIRE THAT A
                PROSPECTUS BE PREPARED OR THAT OTHER DISCLOSURE REQUIREMENTS BE MET OR WHERE OTHER
                INVESTOR SAFEGUARDS OR REGULATORY DOCUMENTS OR LICENSING IS REQUIRED IN CONNECTION
                WITH THE MARKETING, OFFERING AND SALE OF THE PRODUCTS BY THE COMPANY IN THE
                PERMITTED JURISDICTIONS. AS AT THE DATE HEREOF THE COMPANY IS NOT LICENSED,
                REGISTERED OR OTHERWISE REGULATED IN THE BRITISH VIRGIN ISLANDS OR IN THE PERMITTED
                JURISDICTIONS IN RELATION TO THE ISSUANCE, OFFERING AND SALE OF PRODUCTS BY THE
                COMPANY.{' '}
              </Trans>
            </p>
            <p className="my-3">
              3.4{' '}
              <Trans>
                OTHER THAN TO THE EXTENT SET OUT IN THE INFORMATION MATERIALS, THE PRODUCTS ARE NOT
                INTENDED TO BE OR TO REPRESENT A STOCK, A LOAN CONTRACT, A COMMODITY, A CURRENCY, A
                SHARE, AN INSTRUMENT CREATING OR ACKNOWLEDGING INDEBTEDNESS, AN INSTRUMENT GIVING
                ENTITLEMENTS TO SECURITIES, A CERTIFICATE REPRESENTING CERTAIN SECURITIES, AN
                OPTION, A FUTURE OR A CONTRACT FOR DIFFERENCE IN THE BRITISH VIRGIN ISLANDS OR IN
                ANY PERMITTED JURISDICTIONS. PRODUCTS ARE NOT INTENDED TO BE SECURITIES IN THE
                BRITISH VIRGIN ISLANDS AND SHALL NOT IN ANY CASE BE CONSIDERED AS SUCH IN THE
                BRITISH VIRGIN ISLANDS AND THE OFFER OF PRODUCTS HAS NOT BEEN REGISTERED WITH ANY
                GOVERNMENTAL AUTHORITY IN THE BRITISH VIRGIN ISLANDS OR ANY PERMITTED JURISDICTIONS.
                YOU ACKNOWLEDGE AND AGREE THAT PRODUCTS DO NOT REPRESENT ANY STOCK, LOAN CONTRACT,
                COMMODITY, CURRENCY, SHARE, INSTRUMENT CREATING OR ACKNOWLEDGING INDEBTEDNESS,
                INSTRUMENT GIVING ENTITLEMENTS TO SECURITIES, CERTIFICATE REPRESENTING CERTAIN
                SECURITIES, OPTION, FUTURE OR CONTRACT FOR DIFFERENCE OR RIGHT TO RECEIVE
                INTELLECTUAL PROPERTY RIGHTS OF ANY MEMBER OF THE ISSUER GROUP, OR ANY VOTING OR
                GOVERNANCE RIGHTS OR ANY OTHER RIGHT TO INFLUENCE THE DEVELOPMENT OR OPERATION OF
                THE COMPANY AND DO NOT REPRESENT ANY OWNERSHIP RIGHT OF OR IN THE COMPANY. HOWEVER,
                WITHOUT LIMITATION TO THE ABOVE, THE COMPANY RESERVES ALL RIGHTS WITH RESPECT TO
                PURSUING ANY FORM OF DECENTRALIZED GOVERNANCE SHOULD IT SO DETERMINE THAT DOING SO
                WOULD BE IN THE BEST INTERESTS OF THE HOLDERS OF PRODUCTS FROM TIME TO TIME.
              </Trans>
            </p>
            <p className="my-3">
              3.5{' '}
              <Trans>
                THE COMPANY RESERVES THE RIGHT TO CANCEL ANY PRODUCT PURCHASE AT ANY TIME IN THE
                COMPANY’S SOLE AND ABSOLUTE DISCRETION AND WITHOUT PRIOR NOTICE AND WITHOUT ANY
                LIABILITY OR FURTHER OBLIGATION OF ANY KIND WHATSOEVER TO YOU OR ANY OTHER PARTY, IN
                THE EVENT THE COMPANY FINDS SUCH MEASURES REASONABLE AND/OR NECESSARY IN A
                PARTICULAR SITUATION, INCLUDING, BUT NOT LIMITED TO, CHANGE OF REGULATORY
                REQUIREMENTS, OR UPON SUSPICION OR DETECTION THAT YOU DO NOT PRIMARILY RESIDE OR ARE
                NOT DOMICILED IN A PERMITTED JURISDICTION OR ARE ENGAGED IN FRAUD OR OTHER ILLEGAL
                ACTIVITY.{' '}
              </Trans>
            </p>
            <p className="my-3">
              3.6{' '}
              <Trans>
                CERTAIN JURISDICTIONS EXPRESSLY PROHIBIT OR RESTRICT THE OFFER, SALE AND/OR PURCHASE
                OF CRYPTOCURRENCIES AND/OR CRYPTOGRAPHIC PRODUCTS, WHILE OTHER JURISDICTIONS MAY
                REQUIRE THE COMPANY AND/OR THE PRODUCTS TO BE LICENSED, REGISTERED, AUTHORISED OR
                OTHERWISE REGULATED. THE PRODUCTS MAY BE DEEMED TO BE SECURITIES FOR PURPOSES OF
                SECURITIES LAWS IN VARIOUS JURISDICTIONS SUCH THAT THE OFFER OR SALE OF PRODUCTS BY
                THE COMPANY IN SUCH JURISDICTIONS MAY REQUIRE REGISTRATION OR OTHER STEPS TO BE
                TAKEN WITH THE RELEVANT REGULATORY AUTHORITIES IN THOSE JURISDICTIONS OR FOR AN
                EXEMPTION FROM SUCH REGISTRATION OR OTHER STEPS BEING A REQUIREMENT. NO SUCH STEPS
                HAVE BEEN TAKEN BY THE COMPANY NOR HAS ANY SUCH RELEVANT EXEMPTION BEEN CONFIRMED.
                SOME OTHER JURISDICTIONS HAVE OR MAY HAVE BEEN EXCLUDED FROM THE PRODUCT SALE FOR
                OTHER REASONS, AS DETERMINED BY THE COMPANY IN ITS SOLE AND ABSOLUTE DISCRETION.
                PERSONS (NATURAL OR LEGAL) WHO ARE A RESIDENT OR TAX RESIDENT, HAVE A DOMICILE IN OR
                OTHERWISE HAVE A RELEVANT CONNECTION WITH ANY PROHIBITED JURISDICTION ARE EXCLUDED
                FROM PARTICIPATING IN THE PRODUCT SALE AND POSSESSING AND USING AN PRODUCT. PRODUCTS
                MAY NOT BE MARKETED, OFFERED OR SOLD DIRECTLY OR INDIRECTLY TO ANY PROHIBITED PERSON
                AND NEITHER THESE T&CS NOR ANY INFORMATION MATERIALS MAY BE SUPPLIED TO ANY
                PROHIBITED PERSON, OR USED IN CONNECTION WITH THE OFFER OR SALE OF PRODUCTS BY THE
                COMPANY TO ANY PROHIBITED PERSON. THE INFORMATION CONTAINED IN THESE T&CS AND/OR,
                ANY INFORMATION MATERIALS WILL NOT CONSTITUTE AN OFFER TO SELL OR AN INVITATION,
                ADVERTISEMENT OR SOLICITATION OF AN OFFER TO BUY ANY PRODUCTS WITHIN A PROHIBITED
                JURISDICTION OR TO ANY PROHIBITED PERSON. FOR THE AVOIDANCE OF DOUBT, THE LIST OF
                PROHIBITED JURISDICTIONS MAY BE CHANGED FROM TIME TO TIME, IRRESPECTIVE OF THE
                AWARENESS OF THE COMPANY AND RELEVANT AMENDMENTS MAY BE MADE TO THESE T&CS. YOU ARE
                ONLY PERMITTED TO USE THE WEBSITE AND PLATFORM AND PURCHASE PRODUCTS FROM THE
                COMPANY OR ANY THIRD PARTY IF YOU ARE NOT A PROHIBITED PERSON. TO THE EXTENT A
                PROHIBITED PERSON ATTEMPTS TO ENTER INTO THESE T&CS, PURCHASE PRODUCTS FROM THE
                COMPANY OR USE THE PLATFORM, SUCH PURPORTED ACTIVITY IS VOID AND OF NO FORCE OR
                EFFECT.{' '}
              </Trans>
            </p>
            <p className="my-3">
              3.7{' '}
              <Trans>
                Each prospective purchaser of Products (whether from the Company or any third party)
                must comply with Applicable Law in connection with its purchase, holding, use and/or
                sale of the Products, including the securities laws of such prospective purchaser’s
                jurisdiction of residence or citizenship. Products may not be re-offered, resold or
                transferred, except in a transaction that is compliant with Applicable Law. Any
                action that is in violation of these restrictions shall be void ab initio and the
                Company reserves the right to void any Products transferred or proposed to be
                transferred in violation of these provisions. The Company specifically disclaims any
                losses in value or potential value experienced by any participant resulting from any
                such restrictions or actions identified hereunder.
              </Trans>
            </p>
            <p className="my-3 font-bold">CLAUSE 4. GENERAL</p>
            <p className="my-3">
              4.1{' '}
              <Trans>
                These T&Cs are effective and binding on You, and the covenants, representations and
                warranties set out herein are repeated, each time You use the Products for any
                purpose or use or access the Platform or use or access any software on or through
                the Platform.
              </Trans>
            </p>
            <p className="my-3">
              4.2{' '}
              <Trans>
                You shall not acquire or seek to acquire any Products or access or use, or seek to
                access or use, the Platform if You are a Prohibited Person.{' '}
              </Trans>
            </p>
            <p className="my-3">
              4.3{' '}
              <Trans>
                The Company may change, modify, amend, alter or supplement these T&Cs (each an
                “Amendment”) at any time in order to reflect (i) changes to Applicable Law that may
                be, or which may otherwise become, applicable to the Products, (ii) any developments
                that may otherwise reasonably be capable of materially adversely impacting the
                Products or their offering by the Company; or (iii) as the Company may in good faith
                deem advisable to protect the reputation of the Company or the effective operation
                of the Platform.
              </Trans>
            </p>
            <p className="my-3">
              4.4{' '}
              <Trans>
                Your continued use of the Products and/or the Platform after any such Amendment
                shall constitute Your consent to such Amendment and acceptance of the amended T&Cs
                (including the Information Materials). If the Company changes, amends, modifies,
                alters or supplements these T&Cs (including any of the Information Materials), the
                Company shall publish on its Website such amended version of these T&Cs and/or the
                Information Materials reflecting such Amendment. The revised T&Cs will be effective
                from the date of posting on the Website or such other date as indicated in the
                amended T&Cs. You waive any right You may have to receive specific notice of such
                Amendment and should review the Website periodically for any changes to these T&Cs.
                If You do not agree to the T&Cs in effect when You access or use the Platform, You
                must stop using the Platform.
              </Trans>
            </p>
            <p className="my-3">
              4.5{' '}
              <Trans>
                These T&Cs and the Platform, and all content herein, therein or thereon, do not (i)
                constitute an offer or solicitation to sell shares, securities or any other
                regulated financial product in any jurisdiction in which such an offer or
                solicitation is prohibited; and (ii) constitute a sale of newly created virtual
                assets to the public under Applicable Laws. None of the information or analyses
                presented herein, therein or thereon are intended to form the basis for any
                investment decision.
              </Trans>
            </p>
            <p className="my-3">
              4.6{' '}
              <Trans>
                Subject to Applicable Laws, each member of the Issuer Group reserves the right, in
                their respective sole and absolute discretion, to refuse to deliver the Products You
                have purchased, and/or modify or to temporarily or permanently suspend or eliminate
                the Platform (or any part thereof) and/or disable any access to the Platform
                (including via use of the Products), including disabling or terminating access to
                Your account or that of any Person attempting access to the Platform from Your
                internet protocol address (for example, where there is a change in Applicable Laws
                or where any member of the Issuer Group suspects that You are engaging in illegal
                activities in connection with Your use of the Platform). In order to seek compliance
                with (or to seek to mitigate the impact of) any Applicable Law or any other laws,
                statutes, ordinances, rules, regulations, judgments, injunctions, orders, treaties,
                administrative acts or decrees of any nation or Governmental Authority, any state or
                other political subdivision thereof, any entity exercising legislative, judicial or
                administrative functions of or pertaining to government, including, without
                limitation, any Governmental Authority, agency, department, board, commission or
                instrumentality, and any court, tribunal or arbitrator(s) of competent jurisdiction,
                and any self-regulatory organization believed by any member of the Issuer Group to
                apply to or affect the Issuer Group, the Product Sale, the Platform or the Products,
                any member of the Issuer Group may in their sole and absolute discretion take such
                steps as they consider necessary or convenient to comply with such matters (which
                may include, without limitation, the termination of any or all Products). This could
                include also, for example, requiring holders of Products from time to time to come
                forward to the Company and confirm their eligibility to hold such Products or the
                cancellation of Products and their replacement with equivalent (or different) rights
                and privileges comprised in another Product or in registered form. In addition, the
                Issuer Group may take such steps as they consider necessary or convenient where they
                believe or suspect the Products may be used, trafficked or applied in the attempted
                furtherance of money laundering, terrorist financing, tax evasion or other unlawful
                activity or where the Issuer Group believes the Platform is no longer viable.
              </Trans>
            </p>
            <p className="my-3">
              4.7{' '}
              <Trans>
                In circumstances where (i) the Company or any Affiliate of the Company is seeking
                compliance with (or seeking to mitigate the impact of) any law, regulation,
                regulatory guidance or policy, governmental statement, decree, order or judicial
                decision of any jurisdiction, court or authority believed by the Company to apply to
                or affect the Company or any Affiliate of the Company, the business of the Company
                or any Affiliate of the Company or the Products, or (ii) the Issuer Group believes
                the Platform is no longer viable, then the Company may in its sole and absolute
                discretion (iii) cancel all or any Products and terminate all obligations of the
                Company in respect of the Products, and/or (iv) amend or vary any obligation of the
                Company in respect of one or more Products.{' '}
              </Trans>
            </p>
            <p className="my-3">
              4.8{' '}
              <Trans>
                The Information Materials and the Website may contain forward-looking statements,
                which can be identified by the fact that they do not relate strictly to historical
                or current facts and may include such words as “may,” “will,” “expect,” “intend,” or
                other expressions of similar meaning, including statements with respect to use of
                proceeds of any sale of Product, usage of the Products and Platform functionality
                and prospects. These forward-looking statements are based on the current
                expectations and a number of factors could affect future events. You should
                carefully review Schedule 2 - Certain Risk Factors, for a discussion of certain
                factors that could affect future events implied by any such forward looking
                statements and certain other risks associated with a purchase of the Products or use
                of the Platform.
              </Trans>
            </p>
            <p className="my-3 font-bold">CLAUSE 5. REPRESENTATIONS AND WARRANTIES; COVENANTS</p>
            <p className="my-3">
              5.1 <Trans>You represent and warrant that: </Trans>
              <p className="ml-9">(i) You are not a Prohibited Person;</p>
              <p className="ml-9">
                (ii) You have legal capacity in the jurisdiction where You are a resident and are
                able to agree and enter into these T&Cs voluntarily and meet all other eligibility
                and residency requirements, including:
              </p>
              <p className="ml-16">
                a. You have full power, authority and capacity to comply with these T&Cs; and
              </p>
              <p className="ml-16">
                b. You enter into these T&Cs based on Your own independent judgement and on advice
                from independent advisers (as applicable).
              </p>
              <p className="ml-9">
                (iii){' '}
                <Trans>
                  You are fully able and legally competent to access and use the Platform as well as
                  to enter into and comply with these T&Cs (including Clause 5.2 below);
                </Trans>
              </p>
              <p className="ml-9">
                (iv){' '}
                <Trans>
                  You will not violate any Applicable Law or any other agreement to which You are a
                  party by entering into these T&Cs or to comply with these T&Cs, including all
                  conditions, obligations, affirmations, representations and warranties set forth
                  herein;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (v){' '}
                <Trans>
                  You will not acquire and will not transfer any Products within the United States
                  of America, its territories or possessions;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (vi){' '}
                <Trans>
                  You will not engage (except as specifically authorized by the Company) in any
                  activity relating to the sale of Products in the United States of America, its
                  territories or possessions or to any U.S. Person;
                </Trans>
              </p>
              <p className="ml-9">
                (vii){' '}
                <Trans>
                  You will not acquire and will not transfer any Products within or engage (except
                  as specifically authorized by the Company) in any activity relating to the sale,
                  distribution or any other use of Products in any Prohibited Jurisdiction or with
                  any Prohibited Person;
                </Trans>
              </p>
              <p className="ml-9">
                (viii){' '}
                <Trans>
                  You will not transfer directly or indirectly any of Your Products to any Person
                  unless the proposed transferee has made the same representations and warranties as
                  set out herein;
                </Trans>
              </p>
              <p className="ml-9">
                (ix){' '}
                <Trans>
                  You have all necessary and relevant experience and knowledge to interact or
                  transact with cryptocurrencies, cryptographic products, the Platform and
                  Blockchain-based systems, have a full understanding of the relevant frameworks of
                  the foregoing, and have obtained sufficient information about the Issuer Group,
                  the Platform and Products to enter these T&Cs, and in particular You have
                  carefully and thoroughly read these T&Cs and the Information Materials;
                </Trans>
              </p>
              <p className="ml-9">
                (x){' '}
                <Trans>
                  You are aware of all the merits, risks (including, without limitation, those set
                  forth in Clause 6 below and in the Information Materials) and any restrictions
                  associated with cryptocurrencies, cryptographic products, Blockchain-based
                  systems, and accept responsibility for evaluating purchasing or using the
                  foregoing;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (xi){' '}
                <Trans>
                  if You are purchasing Products on behalf of a corporation, Governmental Authority
                  or other legal entity, You have the right, power and authority to enter into these
                  T&Cs on behalf of such corporation, Governmental Authority or other legal entity
                  and bind them to these T&Cs;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (xii){' '}
                <Trans>
                  You are not: (A) identified on, or acting on behalf of any Person identified on,
                  any list of Persons subject to trade or economic sanctions, including but not
                  limited to the list of Specially Designated Nationals and Blocked Persons, or the
                  Consolidated Sanctions List, maintained by the U.S. Treasury Department’s Office
                  of Foreign Assets Control, (B) established in, resident in, or otherwise operating
                  from countries or territories subject to U.S. economic sanctions, including any
                  Prohibited Jurisdiction, and (C) otherwise subject to trade or economic sanctions;
                </Trans>
              </p>
              <p className="ml-9">
                (xiii){' '}
                <Trans>
                  You will not access or use the Platform if any Applicable Laws prohibit You from
                  doing so;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (xiv){' '}
                <Trans>
                  You are not using and will not use the Platform or Products for any illegal or
                  unlawful activity, including, but not limited to, money laundering and the
                  financing of terrorism;
                </Trans>
              </p>
              <p className="ml-9">
                (xv){' '}
                <Trans>
                  You have not entered or agreed to enter into these T&Cs in reliance of any
                  warranty or representation except those specifically set forth in these T&Cs and
                  You acknowledge and agree that the Issuer Group does not make and expressly
                  disclaims all representations and warranties, express, implied or statutory;
                </Trans>
              </p>
              <p className="ml-9">
                (xvi){' '}
                <Trans>
                  the funds You use to purchase Products are not the proceeds of any criminal,
                  unlawful or illegal activity or money laundering or terrorist financing activity,
                  each as interpreted in the broadest terms;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (xvii){' '}
                <Trans>
                  the Products You purchase will not be used to facilitate any criminal, unlawful or
                  illegal activity or to perform any money laundering or terrorist financing
                  activity, each as interpreted in the broadest terms or otherwise in contravention
                  of any Applicable Laws;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (xvii){' '}
                <Trans>
                  You do not seek to purchase Products for any unlawful purpose, and in particular:
                </Trans>
                <p className="ml-16">
                  a. You purchase the Products only for the purposes expressly set out and permitted
                  by these T&Cs,{' '}
                </p>
                <p className="ml-16">
                  b. You purchase the Products without any expectation of profit, dividend, capital
                  gain, financial yield or any other return, payment or income of any kind;
                </p>
                <p className="ml-16">
                  c. Your participation in connection with any initiatives with the Product Sale,
                  such as bonuses (if these are implemented at the Company’s sole and absolute
                  discretion), is lawful; and
                </p>
                <p className="ml-16">
                  d. all information given by You is true, complete, valid and not misleading in any
                  respect.
                </p>
              </p>
              <p className="ml-9">
                (xix){' '}
                <Trans>
                  You will implement reasonable and appropriate measures designed to secure access
                  to: (A) any device associated with You and/or utilized in connection with Your
                  purchase of Products, (B) private keys to Your wallet or account and (C) email
                  address, account and Your username, password and any other login or identifying
                  credentials;
                </Trans>
              </p>
              <p className="ml-9">
                (xx){' '}
                <Trans>
                  You are entering into these T&Cs for Your own account and not as a trustee,
                  nominee, representative or agent, and not with a view to, or for resale in
                  connection with, the distribution thereof, and You have no present intention of
                  selling, granting any participation in, or otherwise distributing the same; and
                </Trans>
              </p>
              <p className="ml-9">
                (xxi){' '}
                <Trans>
                  You will promptly notify the Issuer Group if You discover or otherwise suspect any
                  security breaches or defects related to Your account, the Platform or the
                  Products.
                </Trans>
              </p>
            </p>
            <p className="my-3">
              5.1 <Trans>YYou undertake and agree not to: </Trans>
              <p className="ml-9">
                (i){' '}
                <Trans>
                  violate or assist any party in violating any Applicable Law or any other law,
                  statute, ordinance, regulation or any rule of any Governmental Authority;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (ii){' '}
                <Trans>
                  provide false, inaccurate, incomplete or misleading information to the Issuer
                  Group;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (iii){' '}
                <Trans>
                  take or attempt to take any action or claim ownership of any property that
                  infringes or would infringe upon: (A) the Issuer Group’s intellectual property
                  rights; or (B) any third party’s intellectual property rights;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (iv){' '}
                <Trans>
                  distribute unsolicited or unauthorized advertising, promotional or marketing
                  material or any junk mail, spam, or chain letters;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (v){' '}
                <Trans>
                  reverse engineer or disassemble any aspect of the Products or the Platform for any
                  purpose, including but not limited to, in an effort to access any source code,
                  object code, underlying ideas and concepts, and algorithms;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (vi){' '}
                <Trans>
                  take any action that imposes an unreasonable or disproportionately large burden or
                  load on the Issuer Group’s infrastructure (including, but not limited to, servers,
                  networks, data centres and related or like equipment), or detrimentally interfere
                  with, intercept, or expropriate any system, data, or information of the Issuer
                  Group;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (vii){' '}
                <Trans>
                  transmit or upload any material to the Platform that contains viruses, Trojan
                  horses, worms, or any other harmful or deleterious programs;{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (viii){' '}
                <Trans>
                  attempt to gain unauthorized access to the Platform, other systems of the Issuer
                  Group, computer systems or networks connected to the Platform, including through
                  password mining or any other means; or{' '}
                </Trans>
              </p>
              <p className="ml-9">
                (ix)<Trans>transfer any rights granted to You under these T&Cs.</Trans>
              </p>
            </p>
            <p className="my-3">
              5.3 THE NUMBER OF TOKENS TO BE GENERATED WITH RESPECT TO A GIVEN NODE WILL DEPEND ON A
              NUMBER OF FACTORS INCLUDING, WITHOUT LIMITATION, THE TIME OR TIMES THAT THE NODE IS
              DEPLOYED, THE NUMBER OF OTHER NODES IN OPERATION AT ANY GIVEN TIME. THE COMPANY HAS
              LIMITED CONTROL OVER SUCH MATTERS AND, ACCORDINGLY, THE COMPANY CANNOT DICTATE THE
              NUMBER OF TOKENS TO BE ISSUED TO YOU IN THE EVENT YOU ACQUIRE A NODE UPON YOUR
              DEPLOYMENT OF A NODE OR WHETHER ANY SUCH DEPLOYMENT WILL BE PROFITABLE FOR YOU.{' '}
            </p>
            <p className="my-3">5.4 In the event you acquire one or more Nodes:</p>
            <p className="ml-9">
              (i){' '}
              <Trans>
                {' '}
                You acknowledge and agree that the Node shall, subject to adjustment at the sole and
                absolute discretion of the Company, operate for a period of approximately five years
                and thereafter no further Token rewards shall be allocated to the Nodes;
              </Trans>
            </p>
            <p className="ml-9">
              (iii){' '}
              <Trans>
                You shall comply with all terms and conditions applicable with respect to the Node
                from time to time;
              </Trans>
            </p>
            <p className="ml-9">
              (iii) <Trans>You shall not take any action not expressly authorized hereunder;</Trans>
            </p>
            <p className="ml-9">
              (iv){' '}
              <Trans>
                You shall not modify or attempt to modify the Node for any purpose including but not
                limited to attempting to circumvent the audit, bypass security, manipulate the
                performance of, or otherwise disrupt the Platform for any reason, including but not
                limited to attempting to increase the number of Tokens entitled thereunder;
              </Trans>
            </p>
            <p className="ml-9">
              (v){' '}
              <Trans>
                You shall operate the Node on only such equipment that meets the Company’s minimum
                requirements as set out from time to time;
              </Trans>
            </p>
            <p className="ml-9">
              (vi){' '}
              <Trans>
                You shall implement and maintain adequate administrative, organisational, physical
                and technical safeguards to ensure the protection, confidentiality, security, and
                integrity of the Node;
              </Trans>
            </p>
            <p className="ml-9">
              (vii){' '}
              <Trans>
                You acknowledge and agree that by running the Node its device may be impacted due to
                additional constraints being placed on it by the Node. In particular, but without
                limiting the generality of the foregoing, your device may not operate as quickly as
                it would without running the Node;
              </Trans>
            </p>
            <p className="ml-9">
              (viii){' '}
              <Trans>
                In connection with your use of the Node, the Company may, from time to time, require
                you to affirm and/or reaffirm your agreement to these T&Cs, and in such case, your
                continued use of the Node is contingent upon your promptly providing such
                affirmation as requested by Company;
              </Trans>
            </p>
            <p className="ml-9">
              (ix){' '}
              <Trans>
                You acknowledge and agree you are responsible for maintaining the security of the
                Node including without limitation all applicable accounts and passwords used to gain
                access to the device the Node is running on;{' '}
              </Trans>
            </p>
            <p className="ml-9">
              (x){' '}
              <Trans>
                You acknowledge and agree that the Company may suspend Your participation in the
                Platform if the Company believes You to be: (a) violating any provisions of these
                T&Cs; or (b) using the Node in a manner that the Company reasonably believes may
                cause a security risk, a disruption to the Platform or any liability for the
                Company; and
              </Trans>
            </p>
            <p className="ml-9">
              (xi){' '}
              <Trans>
                You shall not (a) rent, sublicense, re-sell, assign, transfer, distribute,
                timeshare, or similarly exploit the Node; (b) reverse engineer, copy, modify, adapt,
                hack the Node, or otherwise attempt to gain unauthorized access to the Node or its
                related systems or networks; (c) access the Node to build a competitive product or
                service; (d) alter or remove, or permit any third party to alter or remove, any
                proprietary trademark or copyright markings incorporated in, marked on, or affixed
                to the Node; (e) allow Nodes to be shared or used by anyone other than You; (f)
                access or use the Node (i) in violation of applicable laws; (ii) to send or store
                material knowingly or intentionally containing software viruses, worms, Trojan
                horses or other harmful computer code, files, or scripts; or (iii) in a manner that
                interferes with or disrupts the integrity or performance of the Platform (or the
                data contained therein); or (g) (i) reverse engineer any aspect of the Node or do
                anything that might discover the contents or origin of the Node, (ii) attempt to
                bypass or circumvent measures employed to prevent or limit access to the Node,
                including by attempting to defeat any encryption, or (iii) attempt to interfere with
                the storage or transmission of data in connection with your Node on your device;
              </Trans>
            </p>
            <p className="my-3">
              5.5{' '}
              <Trans>
                You further represent and warrant that any funds You use to purchase Products
                whether in the Product Sale or otherwise are in each case Your property or You are
                duly authorized to possess and transact using such funds by the owner of such funds.{' '}
              </Trans>
            </p>
            <p className="my-3">
              5.6{' '}
              <Trans>
                You acknowledge and agree that the Company enters into these T&Cs with You in
                reliance on the representations and warranties set out in this Clause 5.{' '}
              </Trans>
            </p>
            <p className="my-3 font-bold">
              CLAUSE 6. RISKS OF PRODUCTS AND LIMITATIONS OF LIABILITIES
            </p>
            <p className="my-3">
              6.1{' '}
              <Trans>
                You understand and acknowledge that Products, Blockchain-based technologies and
                other associated and related technologies are not exclusively (or, as appropriate,
                at all) controlled by the Issuer Group and adverse changes in market forces or the
                technology, broadly construed, may prevent or compromise the Company’s performance
                under these T&Cs. As such, the purchase of Products carries with it a number of
                risks. Prior to purchasing any Product, You should carefully consider the risks
                listed herein and in the Information Materials and, to the extent necessary, consult
                an appropriate lawyer, accountant, or tax professional. If any of the risks
                associated with purchasing and holding of Products is unacceptable to You, You
                should not purchase Products. YOU ACKNOWLEDGE, AGREE AND ASSUME ALL RISKS ASSOCIATED
                WITH THESE T&Cs AND THE PRODUCTS INCLUDING, WITHOUT LIMITATION, THOSE RISKS
                DISCLOSED IN THE INFORMATION MATERIALS.
              </Trans>
            </p>
            <p className="my-3">
              6.2{' '}
              <Trans>
                You do hereby confirm that You have read and fully understood Schedule 2 (Certain
                Risk Factors) to these T&Cs and accept the risks identified therein.
              </Trans>
            </p>
            <p className="my-3">
              6.3{' '}
              <Trans>
                There may be additional risks that cannot be anticipated or foreseen due to the
                incipience of cryptographic product technology, Blockchain-based technology and
                related technologies.{' '}
              </Trans>
            </p>
            <p className="my-3 font-bold">CLAUSE 7. DISCLAIMER OF WARRANTIES</p>
            <p className="my-3">
              7.1{' '}
              <Trans>
                THE PLATFORM AND ANY PURCHASED PRODUCTS ARE PROVIDED TO THE FULLEST EXTENT LEGALLY
                PERMISSIBLE TO YOU “AS IS” AND ON AN “AS AVAILABLE” BASIS WITH NO WARRANTY OF ANY
                KIND EITHER, STATUTORY, EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE
                IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY, AND FITNESS FOR A
                PARTICULAR PURPOSE. YOU ASSUME ALL RESPONSIBILITY AND RISK WITH RESPECT TO YOUR USE
                OF THE PLATFORM AND PURCHASE OF PRODUCTS.
              </Trans>
            </p>
            <p className="my-3">
              7.2{' '}
              <Trans>
                NONE OF THE ISSUER GROUP, THE FOUNDERS OF THE ISSUER GROUP OR ANY OF THEIR
                RESPECTIVE AFFILIATES OR ADVISERS MAKE ANY WARRANTY OR REPRESENTATION WITH RESPECT
                TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF
                THE PLATFORM, INCLUDING THAT THE PLATFORM OR ANY SERVICES OBTAINED THROUGH THE
                PLATFORM WILL BE RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE
                CORRECTED, THAT THE PLATFORM OR THE ISSUER GROUP’S SERVERS ARE FREE OF VIRUSES OR
                OTHER HARMFUL COMPONENTS. YOUR ACCESS TO OR USE OF THE PLATFORM, INCLUDING
                CRYPTOCURRENCY SERVICES, ASSETS, AND ANY INFORMATION, IMAGES OR AUDIO CONTAINED OR
                RELATED TO THE PLATFORM IS AT YOUR OWN RISK.
              </Trans>
            </p>
            <p className="my-3">
              7.3{' '}
              <Trans>
                THE ISSUER GROUP DOES NOT REPRESENT OR WARRANT THAT THE INFORMATION, SOFTWARE,
                SERVICES CONTAINED IN OR PROVIDED BY THE PLATFORM COMPLIES WITH ANY APPLICABLE LAWS
                OR ACCOUNTING RULES.
              </Trans>
            </p>
            <p className="my-3">
              7.4{' '}
              <Trans>
                YOU UNDERSTAND AND EXPRESSLY AGREE THAT NONE OF THE ISSUER GROUP, THE FOUNDERS OF
                THE ISSUER GROUP OR ANY OF THEIR RESPECTIVE AFFILIATES OR ADVISERS ISSUER GROUP
                REPRESENTS, WARRANT OR GUARANTEES IN ANY WAY THAT PRODUCTS MIGHT BE SOLD OR
                TRANSFERRED, OR BE SALEABLE OR TRANSFERABLE, OR THERE IS AN ABILITY OR WILL BE A
                PLATFORM TO EXCHANGE PRODUCTS FOR FIAT CURRENCIES, CRYPTOCURRENCIES OR CRYPTOGRAPHIC
                PRODUCTS, DURING OR AFTER THE PRODUCT SALE. THE ISSUER GROUP FURTHER DOES NOT MAKE
                ANY REPRESENTATIONS OR WARRANTIES WITH RESPECT TO THE REGULATORY OVERSIGHT OR THE
                USE OR SECURITY OF ANY SUCH EXCHANGE.{' '}
              </Trans>
            </p>
            <p className="my-3">
              7.5{' '}
              <Trans>
                THE ISSUER GROUP DOES NOT GUARANTEE THAT THE PLATFORM CANNOT BE DUPLICATED (EITHER
                IN PART OR IN FULL) BY A THIRD PARTY WITHOUT THE PRIOR WRITTEN CONSENT OF THE OWNER
                OF THE PLATFORM. THE ISSUER GROUP HEREBY EXPRESSLY WARNS YOU THAT YOU SHOULD NOT
                ENTER, USE OR PURCHASE ANY PRODUCT OR PRODUCTS SIMILAR TO THE PRODUCTS FROM ANY
                SOURCES (OTHER THAN VIA THE ISSUER GROUP).
              </Trans>
            </p>
            <p className="my-3">
              7.6{' '}
              <Trans>
                IF APPLICABLE LAW DOES NOT PERMIT ALL OR ANY PART OF THE ABOVE EXCLUSION OF
                WARRANTIES OR DISCLAIMER OF IMPLIED TERMS IN CONTRACTS TO APPLY TO YOU, THE
                LIMITATIONS, EXCLUSIONS AND DISCLAIMERS WILL APPLY TO YOU ONLY TO THE EXTENT
                PERMITTED BY APPLICABLE LAW.{' '}
              </Trans>
            </p>
            <p className="my-3">
              7.7{' '}
              <Trans>
                IF ANY GUARANTEE, WARRANTY, TERM OR CONDITION IS IMPLIED OR IMPOSED IN RELATION TO
                THESE T&CS OR ANY APPLICABLE LAW AND CANNOT BE EXCLUDED
              </Trans>
              (<Trans>A “NON-EXCLUDABLE PROVISION”</Trans>),{' '}
              <Trans>
                AND THE ISSUER GROUP IS ABLE TO LIMIT YOUR REMEDY FOR A BREACH OF THE NON-EXCLUDABLE
                PROVISION, THEN THE LIABILITY OF THE ISSUER GROUP FOR BREACH OF THE NON-EXCLUDABLE
                PROVISION IS LIMITED TO THE FOLLOWING AT THE ISSUER GROUP’S OPTION, IN THE CASE OF
                SERVICES, THE SUPPLYING OF THE SERVICES AGAIN, OR THE PAYMENT OF THE COST OF HAVING
                THE SERVICES SUPPLIED AGAIN.
              </Trans>
            </p>
            <p className="my-3 font-bold">CLAUSE 8. LIMITATION OF LIABILITY</p>
            <p className="my-3">
              8.1{' '}
              <Trans>
                Other than as specified herein, all purchases of Products from the Company or any
                Affiliate of the Company are final and non-refundable. By (i) purchasing Products
                from the Company or any Affiliate of the Company; or (ii) purchasing Products from
                any third party, You acknowledge and agree that none of the Issuer Group nor any of
                the founders of the Issuer Group nor any of their past, present or future
                Affiliates, directors, officers, employees, agents, advisers, successors or
                permitted assignees (collectively, each a{' '}
              </Trans>
              <Trans>“Relevant Party”</Trans>){' '}
              <Trans>
                {' '}
                are required to (i) provide a refund for any reason other than as specified herein;
                (ii) ensure any liquidity for the exchange of Products; or (iii) ensure You receive
                money or any other compensation for any Product that is not used or remains unused
                for any reason.{' '}
              </Trans>
            </p>
            <p className="my-3">
              8.2{' '}
              <Trans>
                You hereby expressly agree that, to the maximum extent permitted by the Applicable
                Law, none of the Relevant Parties shall be liable to You, regardless of the basis or
                theory upon which the liability is claimed, for any damage or loss, including loss
                of business, revenue, anticipated savings, profits, or loss of or damage to data,
                equipment, software, or goodwill, as well as personal injury, pain and suffering,
                and emotional distress (direct, indirect, punitive, actual, consequential,
                incidental, special, exemplary or otherwise), regardless of whether such loss was
                foreseeable, resulting from:
              </Trans>
            </p>
            <p className="ml-16">
              (i){' '}
              <Trans>
                the use of, inability to use, or availability or unavailability of the Platform
                material, information, software, facilities, or content;
              </Trans>
            </p>
            <p className="ml-16">(ii) Your purchase of Products or Your use of them;</p>
            <p className="ml-16">
              (iii){' '}
              <Trans>
                any change in the value of Products or any cryptocurrency or cryptographic utility;{' '}
              </Trans>
            </p>
            <p className="ml-16">
              (iv){' '}
              <Trans>
                the ability or inability to sell or transfer Products, or the existence or
                nonexistence of any platform to exchange Products for fiat currencies,
                cryptocurrencies or cryptographic Products, during or after the Product Sale;
              </Trans>
            </p>
            <p className="ml-16">
              (v){' '}
              <Trans>
                any illegal or unauthorized (A) use of the Platform, or (B) purchase or use of
                Products;
              </Trans>
            </p>
            <p className="ml-16">
              (vi){' '}
              <Trans>
                Your ability or inability to use the Platform, including, but not limited to, the
                occurrence or existence of any defect, interruption, deletion of files or emails,
                delays in the operation or transmission of information to or from the Platform, a
                Force Majeure Event, communications failure, or theft, destruction or unauthorized
                access to the Issuer Group’s records, programs, services, server, or other
                infrastructure relating to the Platform;
              </Trans>
            </p>
            <p className="ml-16">
              (vii){' '}
              <Trans>
                the use of or purchase from any third-party websites (including any website You use
                to purchase Products or who processes the purchase of Products on Your behalf) or
                other Internet-resources that copy the Platform or propose to sell Products;
              </Trans>
            </p>
            <p className="ml-16">
              (viii){' '}
              <Trans>
                the release of any information You provided to the Issuer Group or any other
                Relevant Party;
              </Trans>
            </p>
            <p className="ml-16">
              (ix){' '}
              <Trans>
                the resale or exchange or attempted resale or exchange of Products for any fiat
                currency, cryptocurrency or cryptographic Product;
              </Trans>
            </p>
            <p className="ml-16">
              (x){' '}
              <Trans>
                the Platform failing to be suitable for the special or particular purpose You
                intend, or the failure of any images or audio contained or related to the Website or
                Platform;{' '}
              </Trans>
            </p>
            <p className="ml-16">
              (xi) <Trans>the Platform being infected with any malicious code or viruses; </Trans>
            </p>
            <p className="ml-16">
              (xii){' '}
              <Trans>
                any action stemming from, occurring due to, or otherwise related to a breach of
                Clause 5 above;{' '}
              </Trans>
            </p>
            <p className="ml-16">
              (xiii){' '}
              <Trans>
                the actions or omissions of any third party payment processing entity or platform
                that You use to purchase Products, or Your inability or ability to use such platform
                or services; and
              </Trans>
            </p>
            <p className="ml-16">
              (xiv){' '}
              <Trans>
                the manifestation or materialization of any risk discussed in Clause 6 herein or the
                Information Materials.
              </Trans>
            </p>
            <p className="my-3">
              8.3{' '}
              <Trans>
                For the avoidance of doubt, this limitation of liability provision shall apply, with
                full force and effect, in perpetuity for the benefit of the Issuer Group and each
                other Relevant Party, and any other entity that is or becomes the owner of the
                Issuer Group or the Platform, whether such ownership occurs through a sale, merger,
                other transaction or by the operation of Applicable Law.
              </Trans>
            </p>
            <p className="my-3">
              8.4{' '}
              <Trans>
                If Applicable Law does not permit all or any part of the above limitation of
                liability in contracts to apply to You, the limitations, exclusions and disclaimers
                will apply to You only to the extent permitted by Applicable Law.
              </Trans>
            </p>
            <p className="my-3 font-bold"> CLAUSE 9. INDEMNITY</p>
            <p>
              You do hereby to the fullest extent permitted by Applicable Law indemnify, defend and
              hold the Company and each other Relevant Party harmless from and against any and all
              loss, penalty, claim, damage, liability or expense whatsoever (including reasonable
              attorneys’ fees and disbursements) due to or arising out of or based upon (i) any
              inaccurate representation or warranty made by You, or breach or failure by You to
              comply with any covenant or agreement made by You in these T&Cs or in any other
              document furnished by You to any of the foregoing in connection with this transaction,
              or (ii) any action instituted by or on behalf of You against the Company or any other
              Relevant Party that is finally resolved by judgement against You or in favour of the
              Company or any other Relevant Party. The remedies provided in this Clause 9 shall be
              cumulative and shall not preclude the assertion by the Company or any other Relevant
              Party of any other rights or the seeking of any other remedies against You. This
              indemnification shall survive any disposition of Your Products.{' '}
            </p>
            <p className="my-3 font-bold"> CLAUSE 10. INTELLECTUAL PROPERTY RIGHTS</p>
            <p className="my-3">
              10.1{' '}
              <Trans>
                Subject to Clause 10.2, You acknowledge as between You and the Issuer Group that the
                Issuer Group has valid, unrestricted and exclusive ownership of all rights, title
                and interest to use the patents, trademarks, trademark registrations, trade names,
                copyrights, know-how, technology and other intellectual property rights to and
                subsisting in the Platform, Products and the Website. As between You and the Issuer
                Group, the Issuer Group is the sole and absolute owner of all intellectual property
                rights currently in (and modifications to) the Platform, Products and the Website.
              </Trans>
            </p>
            <p className="my-3">
              10.2{' '}
              <Trans>
                Except as expressly assigned in writing by the Issuer Group, all copyright and any
                other intellectual property of the Issuer Group, all content and other materials
                contained on the Platform or within the Products or provided in connection with the
                Platform or the Products, including, without limitation, the intellectual property
                rights for the Platform and the Products and all text, graphics, visual interfaces,
                photographs, trademarks, logos, artwork, computer code, designs, structures,
                selections, methods, algorithms, coordination, and expressions (collectively the
                “Issuer Group Materials”) are the exclusive property of the Issuer Group.
              </Trans>
            </p>
            <p className="my-3">
              10.3{' '}
              <Trans>
                You may not reproduce, distribute, modify, disassemble, reverse engineer, create
                derivative works of, publicly display, publicly perform, republish, download, store
                or transmit any of the Issuer Group Materials (the “Prohibited Actions”). Except as
                expressly set forth herein, these T&Cs do not contain any implied license and the
                Issuer Group expressly reserves all rights not granted to You herein, including all
                rights, title and interest in the Platform, the Products and any related content.
              </Trans>
            </p>
            <p className="my-3">
              10.4{' '}
              <Trans>
                You will be in breach of these T&Cs if You perform or have performed on Your behalf
                any Prohibited Action, or if You print, copy, modify, download or otherwise use or
                provide any other Person with access to any Issuer Group Materials without the
                express written consent of the Issuer Group. Upon such a breach, the Issuer Group
                may (without limiting its other rights and remedies), terminate Your account in its
                sole and absolute discretion and disable Your access to the Platform, in each case
                without notice to You. Upon the Company’s request, You shall immediately return or
                destroy any copies of the Issuer Group Materials in Your possession.
              </Trans>
            </p>
            <p className="my-3 font-bold">CLAUSE 11. THIRD-PARTY CONTENT</p>
            <p className="my-3">
              <Trans>
                The Platform may contain links to third-party websites and services. Such links are
                provided for Your convenience. The Issuer Group shall not be considered to make any
                recommendation or endorsement of any third-party website or its content, unless
                expressly stated by the Issuer Group. In addition, the Issuer Group does not
                suggest, imply or guarantee the safety, accuracy or reliability of any third-party
                website or the conformity of such with Your expectations. Furthermore, the Issuer
                Group is not responsible for maintaining any materials referenced from another site,
                and makes no warranties, recommendation or endorsement for that site or any service
                provided thereby or thereon. The Issuer Group assumes no obligations in the event of
                any damage or loss, or any other impact, directly or indirectly resulting from Your
                (or any other Person’s) use of any content, goods or services available on or
                through any such third-party websites and resources.
              </Trans>
            </p>

            <p className="my-3 font-bold">CLAUSE 12. APPLICABLE LAW</p>
            <p>
              12.1{' '}
              <Trans>
                PLEASE READ THIS CLAUSE CAREFULLY BECAUSE IT LIMITS THE MANNER IN WHICH YOU CAN SEEK
                RELIEF.
              </Trans>
            </p>
            <p className="my-3">
              12.2{' '}
              <Trans>
                To resolve any dispute, controversy or claim between the Parties arising out of or
                relating to these T&Cs, or the breach thereof, the Parties agree first to negotiate
                in good faith for a period of not less than thirty (30) days following written
                notification of such controversy or claim to the other Party. Notice to the Company
                shall be sent through the various channels made available on the Website. Notice to
                You shall be by email or such other means as the Company may determine from time to
                time in its sole and absolute discretion. Your notice must include (a) Your name,
                postal address, email address and telephone number, (b) a description in reasonable
                detail of the nature or basis of the dispute, and (c) the specific relief that You
                are seeking.
              </Trans>
            </p>
            <p className="my-3">
              12.3{' '}
              <Trans>
                All rights and obligations hereunder shall be governed by the Laws of the British
                Virgin Islands, without regard to the conflicts of law provisions of such
                jurisdiction. The Parties submit to the non-exclusive jurisdiction of the courts of
                the British Virgin Islands and any courts competent to hear appeals from those
                courts.{' '}
              </Trans>
            </p>

            <p className="my-3">
              12.4{' '}
              <Trans>
                Except for any disputes, claims, suits, actions, causes of action, demands or
                proceedings in which either Party seeks injunctive or other equitable relief for the
                alleged unlawful use of intellectual property, including, without limitation,
                copyrights, trademarks, trade names, logos, trade secrets or patents, You and the
                Company waive Your and Company’s respective rights to a jury trial.{' '}
              </Trans>
            </p>
            <p className="my-3 font-bold">CLAUSE 13. MISCELLANEOUS</p>
            <p className="my-3">
              13.1{' '}
              <span className="font-bold">
                <Trans>Third Party Rights</Trans>
              </span>
              <Trans>
                You hereby acknowledge and agree that each Relevant Party is an intended third-party
                beneficiary under these T&Cs (and the Company shall hold the benefit of such
                provisions on trust for each such Relevant Party). However, the parties to these
                T&Cs may rescind or vary these T&Cs (including, without limitation, any variation so
                as to extinguish or alter a third party's entitlement to enforce any provisions of
                these T&Cs) without the consent of any such third party.
              </Trans>
            </p>
            <p className="my-3">
              13.2{' '}
              <span className="font-bold">
                <Trans>Security.</Trans>
              </span>
              <Trans>
                {' '}
                You must at all times remain the only person who has control over Your private key,
                digital wallet and any other device associated with the purchase of Products and any
                username, passwords or other login or identifying credentials used by You with
                respect to the Platform and the Products. You must implement reasonable and
                appropriate measures designed to secure access to any private key, digital wallet or
                any other device associated with the purchase of Products or the use of the
                Platform. If You transfer any such private key, digital wallet or any other device
                associated with the purchase of Products or the use of the Platform to any third
                party, You do so at Your own risk and the Issuer Group shall not be held responsible
                for any loss You may suffer as a result of third parties accessing Your private key,
                digital wallet or any other device associated with the purchase of Products or the
                use of the Platform. In the event that You are no longer in possession and control
                of any private key, digital wallet or any other device associated with the purchase
                of Products, the use of the Platform and/or if You are unable to provide login or
                identifying credentials to the Issuer Group and/or if the private key file or
                password respectively become lost or stolen, You may lose all of Your Products,
                access to the use of the Platform and/or the access to Your digital wallet. For the
                avoidance of doubt, the Issuer Group is under no obligation to recover or replace
                any such lost or stolen Products or the access to the use of the Platform and You
                understand and agree that, subject to the provisions of these T&Cs, all Product
                purchases are non-refundable and therefore You shall not receive any amount of
                currency or other compensation for any Products purchased and/or lost for whatever
                reason. Failure to use the Platform correctly and/or to follow the Issuer Group’s
                procedures as may be made available from time to time may result in You not
                receiving any Products, losing access to the use of the Platform or losing some or
                all of the amounts paid in exchange for Products, regardless of the purchase date.
              </Trans>
            </p>

            <p className="my-3">
              13.3{' '}
              <span className="font-bold">
                <Trans>Suspension.</Trans>
              </span>
              <Trans>
                {' '}
                Notwithstanding anything contained herein, the Issuer Group reserves the right,
                without notice and in its sole and absolute discretion, to suspend Your right to
                access the Platform, and all related information and files without liability to You,
                at its sole and absolute discretion, including but not limited to, in case of Your
                breach of these T&Cs or if the Issuer Group believes You have committed fraud or
                other misconduct or are a Prohibited Person. Upon any such suspension all rights and
                licenses granted to You under these T&Cs will immediately terminate. In the event of
                any Force Majeure Event, breach of these T&Cs, or any other event that would make
                the operation or provision of the Platform or related services commercially
                unreasonable for the Issuer Group, the Issuer Group may, in its discretion and
                without liability to You, with or without prior notice, suspend Your access to all
                or a portion of the Platform. To the extent permitted under Applicable Law
                (including in the event of applicable legislation change or amendment), in the event
                the Issuer Group revokes Your right to use or access the Platform the Issuer Group
                shall not be required to provide You with any refund whatsoever.{' '}
              </Trans>
            </p>

            <p className="my-3">
              13.4{' '}
              <span className="font-bold">
                <Trans>Applicability of Securities Laws.</Trans>
              </span>
              <Trans>
                {' '}
                References to the securities laws of any country or actions in compliance with such
                laws shall not be deemed an admission by the Company that the Products are subject
                to regulation as securities in any jurisdiction.
              </Trans>
            </p>

            <p className="my-3">
              13.5{' '}
              <span className="font-bold">
                <Trans>Entire Agreement.</Trans>
              </span>
              <Trans>
                {' '}
                Unless otherwise provided, these T&Cs are intended to fully reflect the terms of the
                agreement between the Parties, and shall supersede any previously or
                contemporaneously agreed upon terms or understanding. No provision of these T&Cs
                shall be considered waived unless such waiver is in writing and signed by the Party
                that benefits from the enforcement of such provision. No waiver of any provision in
                these T&Cs, however, will be deemed a waiver of a subsequent breach of such
                provision or a waiver of a similar provision. In addition, a waiver of any breach or
                a failure to enforce any term or condition of these T&Cs will not in any way affect,
                limit, or waive a Party’s rights hereunder at any time to enforce strict compliance
                thereafter with every term and condition hereof.
              </Trans>
            </p>

            <p className="my-3">
              13.6{' '}
              <span className="font-bold">
                <Trans>Assignment.</Trans>
              </span>
              <Trans>
                {' '}
                The Company may, at its sole and absolute discretion, assign any of its rights
                and/or delegate its duties under these T&Cs (including, but not limited to any and
                all intellectual property rights in or to all technology, software, and code
                relating to the Platform). You may not assign Your rights or delegate Your duties as
                a user of the Platform, or as a purchaser of Products, and any assignment or
                delegation without the written consent of the Company, which the Company may
                withhold at its sole and absolute discretion, shall be null and void.{' '}
              </Trans>
            </p>

            <p className="my-3">
              13.7{' '}
              <span className="font-bold">
                <Trans>Severability.</Trans>
              </span>
              <Trans>
                {' '}
                In the event any one or more of the provisions of these T&Cs are for any reason held
                to be invalid, illegal or unenforceable in any jurisdiction, in whole or in part or
                in any respect, or in the event that any one or more of the provisions of these T&Cs
                operate or would prospectively operate to invalidate these T&Cs in any jurisdiction,
                then and in any such event, such provision(s) shall be deemed modified to the
                minimum extent necessary so that such provision, as so modified, shall no longer be
                held to be invalid, illegal or unenforceable. Any such modification, invalidity or
                unenforceability shall be strictly limited both to such provision and to such
                jurisdiction, and in each case to no other. Furthermore, in the event of any such
                modification, invalidity or unenforceability, these T&Cs shall be interpreted so as
                to achieve the intent expressed herein to the greatest extent possible in the
                jurisdiction in question and otherwise as set forth herein.
              </Trans>
            </p>

            <p className="my-3">
              13.8{' '}
              <span className="font-bold">
                <Trans>Electronic Notices and Use of Information.</Trans>
              </span>
              <Trans>
                {' '}
                You (i) agree and consent to receive electronically all communications, agreements,
                documents, receipts, notices and disclosures (hereinafter - the “Communications”)
                that the Issuer Group provides in connection with Your use of the Platform; and (ii)
                have read and fully understood the Company’s Privacy Notice. The Issuer Group and
                each of its Affiliates and their respective service providers may further disclose
                Your information to any of their respective service providers, agents, relevant
                custodians or similar third parties for any reason and such Persons may keep Your
                information for any period of time permitted by Applicable Law. You do hereby
                consent to such Persons disclosing any of Your information which they hold to any
                Governmental Authority or prosecuting authority for any reason and without notice to
                You. You hereby acknowledge and agree to hold the Issuer Group and each such
                Affiliate harmless in respect of any disclosure of information by such Persons in
                accordance with these T&Cs. For the avoidance of any doubt, the Issuer Group and
                each such Affiliate shall not be liable to You or any other Person for any loss,
                damage or expense incurred directly or indirectly as a result of such disclosure.
              </Trans>
            </p>

            <p className="my-3">
              13.9{' '}
              <span className="font-bold">
                <Trans>Information Requests.</Trans>
              </span>
              <Trans>
                {' '}
                The Issuer Group may determine, from time to time and in its sole and absolute
                discretion, that it is necessary to obtain certain information about You and Your
                Affiliates in order to comply with Applicable Laws in connection with Your entry
                into these T&Cs and Your subsequent holding of Products. You agree to provide the
                Issuer Group with such information promptly upon request, and You acknowledge and
                accept that the Company may refuse to accept Your application until You provide such
                requested information and the Company has determined that it is permissible for the
                Company to accept Your application and receive the purchase amount from You under
                Applicable Law. The Issuer Group further reserves the right to request
                identification documentation from You and Your Affiliates at any time. In the event
                that You or any such Affiliate does not provide such requested information to the
                satisfaction of the Company (in its sole and absolute discretion) the Company shall
                not be bound by the provisions of these T&Cs and shall be entitled to specifically
                refuse any presentation of Products by You to the Issuer Group or any other Relevant
                Party. In the event that You, directly or indirectly, sell, assign, transfers,
                convey or otherwise dispose of any Products You do hereby covenant with the Issuer
                Group to procure that any such acquirer of Products shall be under equivalent
                obligations to provide such information to the Issuer Group at the request of the
                Issuer Group from time to time.
              </Trans>
            </p>

            <p className="my-3">
              13.10{' '}
              <span className="font-bold">
                <Trans>Tax Issues.</Trans>
              </span>
              <Trans>
                {' '}
                The Issuer Group makes no representations concerning the tax implications of the
                sale of Products or the possession or use of them. You bear the sole and absolute
                responsibility to determine if the purchase of Products with fiat currency or
                cryptocurrency or the potential appreciation or depreciation in the value of
                Products over time has tax implications for You in Your home jurisdiction or any
                other jurisdiction. By purchasing Products, and to the extent permitted by
                Applicable Law, You agree to be solely responsible for any applicable taxes imposed
                on, and agree not to hold the Issuer Group or any of its Affiliates liable for any
                tax liability associated with or arising from Your purchase, possession, or transfer
                of Products. All fees and charges payable by You to the Company are exclusive of any
                taxes, and shall certain taxes be applicable, they shall be added on top of the
                payable amounts. Upon the Company’s request, You will provide it any information it
                reasonably requests to determine whether it is obligated to collect any withholding
                taxes or value added or similar taxes from You, including any applicable tax
                identification numbers. If any deduction or withholding is required by Applicable
                Law, You will notify the Company and will pay the Company any additional amounts
                necessary to ensure that the net amount that the Company receives, after any
                deduction and withholding, equals the amount the Company would have received if no
                deduction or withholding had been required. Additionally, You will provide the
                Company with documentation showing that the withheld and deducted amounts have been
                paid to the relevant taxing authority. To the extent the Company is responsible for
                remitting any withholding taxes or value added or similar taxes, Your allocation of
                Products shall be reduced to the extent such taxes are required to be remitted by
                the Company. The Issuer Group wishes to make You aware that future use of the
                Products by You when transacting with the Issuer Group may result in withholding
                taxes, value added tax and/or similar taxes being imposed. You will be responsible
                for such taxes, however, where the Company is responsible for remitting taxes, the
                amount of taxes shall be deducted from the fees otherwise due and payable by You in
                connection with Your transactions with the Company.
              </Trans>
            </p>

            <p className="my-3">
              13.11{' '}
              <span className="font-bold">
                <Trans>Force Majeure Events.</Trans>
              </span>
              <Trans>
                {' '}
                The Issuer Group shall not be liable for (1) any inaccuracy, error, delay in, or
                omission of (a) any information, or (b) the transmission or delivery of information;
                (2) any loss or damage arising from any event beyond the Issuer Group’s reasonable
                control, including but not limited to flood, extraordinary weather conditions,
                earthquake, or other act of God, fire, war, insurrection, pandemic, riot, labour
                dispute, accident, action of Governmental Authorities, communications, power
                failure, or equipment or software malfunction or any other cause beyond the Issuer
                Group’s reasonable control (each, a “Force Majeure Event”).
              </Trans>
            </p>

            <p className="my-3">
              13.12{' '}
              <span className="font-bold">
                <Trans>Compliance Policies.</Trans>
              </span>
              <Trans>
                {' '}
                The Issuer Group and its Affiliates strictly follow applicable anti-money laundering
                (AML), “know your customer” (KYC) and other Applicable Laws in the British Virgin
                Islands. You fully agree to assist the Issuer Group in fulfilling the obligations of
                any Applicable Law and to provide any necessary information that is required from
                You to the Issuer Group or any relevant Governmental Authority.
              </Trans>
            </p>

            <p className="my-3">
              13.13{' '}
              <span className="font-bold">
                <Trans>Further Assistance.</Trans>
              </span>
              <Trans>
                {' '}
                You shall cooperate with and assist the Issuer Group and its Affiliates in
                connection with any investigation, examination or enquiry by any Governmental
                Authority. You shall promptly provide the Issuer Group and its Affiliates with any
                documents, certification, record or other materials they may request in connection
                with such investigation, examination or enquiry.
              </Trans>
            </p>

            <p className="my-3">
              13.14{' '}
              <span className="font-bold">
                <Trans>Headings.</Trans>
              </span>
              <Trans>
                {' '}
                Headings are for convenience only and shall not be used to limit or construe any
                provisions of these T&Cs.{' '}
              </Trans>
            </p>
            <p className="my-3 font-bold">
              <span className="font-bold underline">
                <Trans>Intellectual Property Notification:</Trans>
              </span>{' '}
              This document belongs to the Company and is protected by copyright laws. Its copying
              and/or use by any third party in full or in part without prior written consent of the
              Company is strictly prohibited.
            </p>
            <p className="my-3">
              <Trans>
                If You have any question or notice any bugs, errors or violations You may send any
                questions regarding the use of the Platform or regarding these T&Cs via the Website.
              </Trans>
            </p>
            <div className="mt-10">
              <p className="my-3 text-center font-bold">
                <Trans>SCHEDULE 1</Trans>
              </p>
              <p className="my-3 text-center font-bold">
                <Trans>LIST OF PROHIBITED JURISDICTIONS</Trans>
              </p>
              <p className="mx-3 my-1">- Cuba</p>
              <p className="mx-3 my-1">- Democratic People’s Republic of North Korea</p>
              <p className="mx-3 my-1">- Islamic Republic of Iran</p>
              <p className="mx-3 my-1">- Libya</p>
              <p className="mx-3 my-1">- South Sudan</p>
              <p className="mx-3 my-1">- Sudan (North)</p>
              <p className="mx-3 my-1">- Syria</p>
              <p className="mx-3 my-1">- The Crimea</p>
              <p className="mx-3 my-1">- The so-called regions of Donetsk and Luhansk</p>
              <p className="mx-3 my-1">
                <Trans>
                  - Any jurisdiction in which the entry into these T&Cs or the ownership of the
                  Products is prohibited by Applicable Law
                </Trans>
              </p>
              <p className="mx-3 my-1 mb-3">
                <Trans>
                  - Any jurisdiction which is subject to United States, United Nations or other
                  applicable sanctions or embargoes
                </Trans>
              </p>
              <Trans>
                The Company reserves the right to add any additional jurisdictions at any time and
                without prior notice.
              </Trans>
            </div>

            <div className="mt-10">
              <p className="my-3 text-center font-bold">
                <Trans>SCHEDULE 2</Trans>
              </p>
              <p className="my-3 text-center font-bold">
                <Trans>CERTAIN RISK FACTORS</Trans>
              </p>
              <p className="my-3">
                <Trans>
                  AN ACQUISITION OF A NODE OR TOKENS INVOLVE A HIGH DEGREE OF RISK. PROSPECTIVE
                  PURCHASERS SHOULD CONSIDER CAREFULLY THE RISKS DESCRIBED HEREIN, TOGETHER WITH ALL
                  OF THE OTHER INFORMATION CONTAINED IN THIS AGREEMENT AND THE INFORMATION MATERIALS
                  BEFORE MAKING AN ACQUISITION DECISION. THE FOLLOWING RISKS ENTAIL CIRCUMSTANCES
                  UNDER WHICH, THE BUSINESS, FINANCIAL CONDITION, RESULTS OR OPERATIONS AND
                  PROSPECTS OF THE ISSUER GROUP COULD SUFFER. THE FOLLOWING IS NOT AN EXHAUSTIVE
                  LIST AND DOES NOT NECESSARILY REFLECT THE RELATIVE IMPORTANCE OF THE VARIOUS RISKS
                  FACTORS. NO MEMBER OF THE ISSUER GROUP OWNS, OPERATES OR CONTROLS THE PLATFORM OR
                  THE PLATFORM OPERATOR.{' '}
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  OTHERWISE THAN AS EXPRESSLY SET OUT HEREIN, THE COMPANY SPECIFICALLY DOES NOT
                  REPRESENT AND WARRANT AND EXPRESSLY DISCLAIMS ANY REPRESENTATION OR WARRANTY WITH
                  RESPECT TO THE INFORMATION MATERIALS, THE PLATFORM AND THE NODES AND/OR TOKENS,
                  EXPRESS, IMPLIED OR STATUTORY, INCLUDING WITHOUT LIMITATION, ANY REPRESENTATIONS
                  OR WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY, USAGE, SUITABILITY OR
                  FITNESS FOR ANY PARTICULAR PURPOSE, OR AS TO THE WORKMANSHIP OR TECHNICAL CODING
                  THEREOF, OR THE ABSENCE OF ANY DEFECTS THEREIN, WHETHER LATENT OR PATENT. THE
                  COMPANY DOES NOT REPRESENT OR WARRANT THAT NODES AND/OR TOKENS OR THE PLATFORM ARE
                  RELIABLE, CURRENT OR ERROR-FREE, MEET YOUR REQUIREMENTS, OR THAT DEFECTS IN THE
                  NODES AND/OR TOKENS OR THE PLATFORM WILL BE CORRECTED. THE COMPANY CANNOT AND DOES
                  NOT REPRESENT OR WARRANT THAT NODES AND/OR TOKENS, THE PLATFORM OR THE DELIVERY
                  MECHANISM THE FOR NODES AND/OR TOKENS IS FREE OF VIRUSES OR OTHER HARMFUL
                  COMPONENTS.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  The precise terms of the privileges and other benefits of the Nodes and/or Tokens
                  will be determined by the Platform Operator in its sole and absolute discretion
                  from time to time. Such privileges and benefits will initially be determined by
                  the Platform Operator on or around the Token Generation Event and may be amended
                  thereafter by the Platform Operator at any time and without notice to, or consent
                  from, any holder of Nodes and/or Tokens, or the Company, in the sole and absolute
                  discretion of the Platform Operator. Any such determination or amendment shall not
                  be a breach of the terms of the Nodes and/or Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Nothing herein prevents new cryptographic tokens that are interoperable with the
                  Platform from being developed and distributed in the future. Where so created, the
                  precise terms of the privileges and other benefits of these distinct tokens will
                  be determined by the Platform Operator in its sole and absolute discretion from
                  time to time.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  The Platform, while not owned, operated, developed or otherwise controlled by the
                  Company, is in beta stage, which means that the Platform and all related software
                  are experimental. The Platform is provided on an “as is” and “as available” basis,
                  without warranty of any kind, either expressed or implied, including, without
                  limitation, warranties that the Platform is free of defects, vulnerabilities,
                  merchantable, fit for a particular purpose or non-infringing. Any use of the
                  Platform shall be at your own risk. In no event shall the Company or the owner of
                  the Platform be held liable in connection with or for any claims, losses, damages
                  or other liabilities, whether in contract, tort or otherwise, arising out of or in
                  connection with the Platform or its operation or use or be under any obligation to
                  support, develop or otherwise maintain or promote the use of the Platform or the
                  integration of the Nodes and/or Tokens into the Platform.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  No promises of future performance or value are or will be made with respect to the
                  Products, including no promise of inherent value, no promise of continuing
                  payments, and no guarantee that the Products will hold any particular value.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  BY PARTICIPATING IN ANY ACQUISITION OF NODES AND/OR TOKENS, YOU EXPRESSLY
                  ACKNOWLEDGE AND ASSUME ALL RISKS RELATED THERETO INCLUDING (WITHOUT LIMITATION)
                  THE RISKS SET OUT BELOW.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Reliance on one or more Developers: The Company may enter into one or more
                  services agreements pursuant to which one or more software developers (each a
                  “Developer”) will provide services with respect to the Company’s development and
                  sale of the Nodes and/or Tokens. As consideration for each such Developer
                  providing those services, the Company may agree to issue the Developer with a
                  significant number of Nodes and/or Tokens. The Director of the Company believes
                  that the provisions of each such Software Development Agreement will reflect
                  commercial arms-length dealings between the Company and each such Developer
                  although there is a material risk that the Nodes and/or Tokens are never created,
                  or are never suitably integrated into the Platform, in the event that the Company
                  is unable to retain suitable Developers for an ongoing period of time.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risk of Losing Access to Nodes and/or Tokens Due to Wallet Incompatibility: Your
                  cryptocurrency wallet must possess technical infrastructure that is compatible
                  with the receipt, storage and transfer of the Tokens. Non-compatible wallet
                  addresses will not be accepted. In addition, your wallet address must not be
                  associated with a third party exchange or service that has custody over the
                  private key. You must own the private key if your address is an exchange address.
                  The Company reserves the right to prescribe additional conditions relating to
                  specific wallet requirements at any time, acting in its sole discretion.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risks Associated with the Blockchain Protocols: Any malfunction, breakdown,
                  abandonment, unintended function, unexpected functioning of or attack on the
                  protocol upon which the Nodes and/or Tokens are issued may have an adverse effect
                  on the Nodes and/or Tokens, including causing them to malfunction or function in
                  an unexpected or unintended manner.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risks Associated with Your Credentials: Any third party that gains access to or
                  learns of your account or wallet login credentials or private keys may be able to
                  dispose of your Nodes and/or Tokens. To minimize this risk, you should guard
                  against unauthorized access to your electronic devices. Best practices dictate
                  that you safely store private keys in one or more backup locations geographically
                  separated from the working location. In addition, you are responsible for giving
                  us the correct wallet address to which you claim your relevant Tokens. If you give
                  us the incorrect address to which to claim your Nodes and/or Tokens, we are not
                  responsible for any loss of Nodes and/or Tokens that may occur.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>Risk of Unfavourable Regulatory Action in One or More Jurisdictions:</Trans>
              </p>
              <p className="my-3">
                <Trans>
                  i.Blockchain technologies and cryptographic tokens have been the subject of
                  scrutiny by various regulatory bodies around the world. Blockchain technology
                  allows new forms of interaction and it is possible that certain jurisdictions will
                  apply existing regulations on, or introduce new regulations addressing, blockchain
                  technology based applications, which regulations may be contrary to the current
                  setup of the Platform or its smart contract system and, therefore, may result in
                  substantial modifications to the Platform and such smart contract systems,
                  including its termination and the loss of Nodes and/or Tokens.{' '}
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  ii.The regulatory status of cryptographic tokens and distributed ledger technology
                  is unclear or unsettled in many jurisdictions. It is difficult to predict how or
                  whether regulatory authorities may apply existing regulation with respect to such
                  technology and its applications, including specifically (but without limitation
                  to) the Platform and Nodes and/or Tokens. It is likewise difficult to predict how
                  or whether any legislative or regulatory authorities may implement changes to law
                  and regulation affecting distributed ledger technology and its applications,
                  including specifically (but without limitation to) the Platform and Nodes and/or
                  Tokens. Regulatory actions could negatively impact the Platform and Nodes and/or
                  Tokens in various ways, including, for purposes of illustration only, through a
                  determination that Nodes and/or Tokens are a regulated financial instrument that
                  requires registration, licensing or restriction. The Company may cease operations
                  in a jurisdiction if regulatory actions, or changes to law or regulation, make it
                  illegal to operate in such jurisdiction, or commercially undesirable to obtain the
                  necessary regulatory approval(s) to operate in such jurisdiction. The functioning
                  of the Platform and the Nodes and/or Tokens could be impacted by any regulatory
                  inquiries or actions, including restrictions on the use, sale or possession of
                  digital tokens like the Nodes and/or Tokens, which restrictions could impede,
                  limit or end the development of the Platform and increase legal costs.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  iii.The cryptocurrency exchange market, the token listing and trading market,
                  initial coin offerings, and by extension the Platform, is subject to a variety of
                  federal, state and international laws and regulations, including those with
                  respect to “know you customer” and “anti-money laundering” and customer due
                  diligence procedures, privacy and data protection, consumer protection, data
                  security, and others. These laws and regulations, and the interpretation or
                  application of these laws and regulations, could change. In addition, new laws or
                  regulations affecting the Platform could be enacted, which could impact the
                  utility of the Nodes and/or Tokens in the Platform. Additionally, users of the
                  Platform are subject to or may be adversely affected by industry specific laws and
                  regulations or licensing requirements. If any of these parties fails to comply
                  with any of these licensing requirements or other applicable laws or regulations,
                  or if such laws and regulations or licensing requirements become more stringent or
                  are otherwise expanded, it could adversely impact the Platform and the Nodes
                  and/or Tokens, including the utility of Nodes and/or Tokens with respect to the
                  Platform.{' '}
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  iv.The Company and/or the Platform Operator may need to obtain approvals from one
                  or more Governmental Authorities and there is a risk that securing such approvals
                  may delay or prevent the TGE, the development of the Platform and/or the Company’s
                  ability to issue the Nodes and/or Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risk of Alternative, Unofficial Platforms: Following the issue of the Nodes and/or
                  Tokens and the continued development of the Platform, it is possible that
                  alternative applications or platforms could be established, which use the same or
                  similar open source code and protocol underlying the Platform. The Nodes and/or
                  Tokens may have no intrinsic value with respect to such alternative applications.
                  The Platform may compete with these alternative, unofficial token-based
                  applications, which could potentially negatively impact the Platform and the Nodes
                  and/or Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Token Generation Risk and Risk of Insufficient Interest in the Platform: There are
                  no guarantees as to the timing of the Nodes and/or Tokens being generated or the
                  release of the Platform, each of which is dependent on many factors, including
                  many outside the Company’s control. The Platform may not be owned, operated or
                  controlled by the Company. Further, it is possible that the Platform will not be
                  used by a large number of businesses, individuals, and other organizations and
                  that there will be limited public interest in the Platform. Such a lack of
                  interest could negatively impact the Nodes and/or Tokens and the Platform.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  No Operating History: The Company has no operating history and will be operating
                  in an evolving industry that may not develop as expected. A significant amount of
                  further work is required in order to create the Nodes and/or Tokens by the Company
                  and implement the Platform by the Platform Operator and much of that work is
                  reliant on the input or consent of other persons not under the control of the
                  Company. Assessing the business and future prospects of the Company and the
                  Platform Operator is challenging in light of the risks and difficulties the
                  Company and the Platform Operator may encounter. These risks and difficulties
                  include, but are not limited to, their ability to:
                </Trans>
              </p>
              navigate complex and evolving regulatory and competitive environments;
              <p className="mx-3 my-1">
                <Trans>
                  - obtain the requisite regulatory and other licenses in the relevant
                  jurisdictions;
                </Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>- obtain and retain customers;</Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>
                  - successfully develop, maintain and update internal controls to manage compliance
                  within an evolving and complex regulatory environment;
                </Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>- effectively identify and react to market trends;</Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>
                  - be involved in the successful development and deployment of the Platform;
                </Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>- implement new products and services;</Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>- successfully execute the Company’s funding strategy;</Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>- effectively compete with other companies;</Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>
                  - successfully navigate economic conditions and fluctuations in the market;
                </Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>- effectively manage the growth of the business;</Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>- continue to develop, maintain and scale the Platform;</Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>- effectively use finite personnel and technology resources;</Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>
                  - effectively maintain and scale financial and risk management controls and
                  procedures;
                </Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>
                  - maintain the security of technology infrastructure, and the confidentiality of
                  the information provided and utilized therein; and
                </Trans>
              </p>
              <p className="mx-3 my-1">
                <Trans>- attract, integrate and retain qualified employees and contractors.</Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risk that the Platform, if ever Developed, Will Not Meet Expectations: The
                  Platform presently is under continued development by the Platform Operator and may
                  undergo significant changes. Any expectations or assumptions regarding the form
                  and functionality of the Platform or the Nodes and/or Tokens (including
                  participant behaviour) held by the owner of the Platform, the Company or you may
                  not be met, for any number of reasons, including, without limitation, mistaken
                  assumptions or analysis, a change in the design and implementation plans, and
                  changes in the execution of the Platform. Moreover, the Company may not be able to
                  retain full and effective control over how other participants will use the
                  Platform, what products or services will be offered through the Platform by third
                  parties, or how third-party products and services will utilize Nodes and/or Tokens
                  (if at all). This could create the risk that the Nodes and/or Tokens or Platform,
                  as further developed and maintained, may not meet your expectations. Furthermore,
                  despite our good faith efforts to assist the owner of the Platform to develop and
                  participate in the Platform, it is still possible that the Platform will
                  experience malfunctions or otherwise fail to be adequately maintained, which may
                  negatively impact the Platform and Nodes and/or Tokens, and the potential utility
                  of the Nodes and/or Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Litigation and Third-Party Claims May Adversely Affect the Development and
                  Adoption of the Platform: From time to time, third parties may assert claims
                  against the Company, its developers and/or its underlying technology. Regardless
                  of the merit of any legal action or claim, any action that reduces confidence in
                  the Company’s long-term viability or the ability of individuals to hold and
                  transfer Nodes and/or Tokens may adversely affect the Platform. Additionally, a
                  meritorious claim could prevent developers from accessing the most up to date
                  Platform code or holding or transferring their Nodes and/or Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  The value of the Nodes and/or Tokens will be affected by the success of the
                  Platform: Because the Nodes and/or Tokens are intended for use on the Platform, a
                  failure by the owner of the Platform to successfully develop and/or maintain the
                  Platform would negatively affect the value of the Nodes and/or Tokens. There is no
                  guarantee that the Platform will develop as planned or become successful in the
                  marketplace.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Long-term viability of cryptoassets: Cryptoassets, including those like the Nodes
                  and/or Tokens, are a new and relatively untested product. There is considerable
                  uncertainty about their long-term viability, which could be affected by a variety
                  of factors, including many market-based factors such as economic growth,
                  inflation, and others. In addition, the success of cryptoassets (including the
                  Nodes and/or Tokens) will depend on the long-term utility and economic viability
                  of blockchain and other new technologies related to cryptoassets. Due in part to
                  these uncertainties, the price of cryptoassets are volatile and the Nodes and/or
                  Tokens may be hard to sell. The Company does not control any of these factors, and
                  therefore may not be able to control the ability of the Nodes and/or Tokens to
                  maintain their value over time.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Further innovations in the cryptoasset industry may cause the Nodes and/or Tokens
                  to lose value: The development and acceptance of the cryptographic and algorithmic
                  protocols governing the issuance of, and transactions in, cryptoassets is subject
                  to a variety of factors that are difficult to evaluate and predict. The use of
                  cryptoassets to, among other things, buy and sell goods and services is part of a
                  new and rapidly evolving commercial practice that employs digital assets based on
                  a computer-generated mathematical and/or cryptographic protocol. The growth of
                  this commercial practice in general, and the use of cryptoassets in particular, is
                  subject to a high degree of uncertainty. Factors affecting further development of
                  the cryptoasset industry include, among other things, the continued worldwide
                  adoption of cryptoassets; governmental and quasi-governmental regulation of
                  cryptoassets and/or cryptoasset exchanges; changing consumer demographics, tastes
                  and preferences; sustained development and maintenance of open-source software
                  protocols; the popularity and availability of alternative and/or new payment
                  services; and general economic conditions. If these factors negatively affect or
                  impede the development of the cryptoasset industry, the value of Nodes and/or
                  Tokens may also be negatively affected.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Inability to Fund Development or Maintenance: The Company may not be able to fund
                  development of the Nodes and/or Tokens while the owner of the Platform may not be
                  able to develop or maintain the Platform in the manner that it was intended.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risks from Taxation: The tax characterization of the Nodes and/or Tokens is
                  uncertain. You must seek your own tax advice in connection with acquiring and
                  holding Nodes and/or Tokens, which may result in adverse tax consequences to you,
                  including withholding taxes, income taxes, and tax reporting requirements. The
                  purchase of Nodes and/or Tokens pursuant thereto may result in adverse tax
                  consequences to purchasers , including withholding taxes, income taxes, and tax
                  reporting requirements. Additionally, subsequent transactions in cryptoassets such
                  as the Nodes and/or Tokens may cause purchasers to incur tax liabilities. Further,
                  any reward received in the form of, or through the use of, Nodes and/or Tokens may
                  result in additional tax liability. Each purchaser should consult with and must
                  rely upon the advice of its own professional tax advisors.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>Risk of Theft and Hacking:</Trans>
              </p>
              <p className="my-3">
                <Trans>
                  i.Smart contracts, software applications and the Platform may be exposed to
                  attacks by hackers or other individuals, groups, organizations or countries that
                  interfere with the Platform or the availability of the Nodes and/or Tokens in any
                  number of ways, including denial of service attacks, Sybil attacks, spoofing,
                  smurfing, malware attacks, or consensus-based attacks, or phishing, or other novel
                  methods that may or may not be known. Any such successful attacks could result in
                  theft or loss of Nodes and/or Tokens, adversely impacting the ability to further
                  develop the Platform and/or related Platforms and derive any usage or
                  functionality from Nodes and/or Tokens. You must take appropriate steps to satisfy
                  yourself of the integrity and veracity of relevant websites, systems and
                  communications. Furthermore, because the Platform is based on open-source
                  software, there is a risk that a third party or a member of the Company’s team may
                  intentionally or unintentionally introduce weaknesses or defects into the core
                  infrastructure of the Platform, which could negatively affect the Platform and
                  Nodes and/or Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  ii.You acknowledge, understand and accept that if your account, private key or
                  password gets lost or stolen, the Nodes and/or Tokens associated with your account
                  or wallet address may be unrecoverable and permanently lost. Additionally, any
                  third party that gains access to your account, private key, including by gaining
                  access to the login credentials relating to your account or wallet, may be able to
                  misappropriate your Nodes and/or Tokens. Any errors or malfunctions caused by or
                  otherwise related to your account of the digital wallet or vault you choose to
                  receive and store Tokens, including your own failure to properly maintain or use
                  such account, digital wallet or vault, may also result in the loss of your Nodes
                  and/or Tokens, for which the Company shall have no liability.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risk of Security Weaknesses in the Platform: The Platform consists, at least in
                  part, of open source software that may be based on other open source software.
                  There is a risk that the Company or other third parties may intentionally or
                  unintentionally introduce weaknesses or bugs into the core infrastructural
                  elements of the Platform interfering with the use of or causing the loss of Nodes
                  and/or Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risk of Weaknesses or Exploitable Breakthroughs in the Field of Cryptography:
                  Advances in cryptography, or technical advances such as the development of quantum
                  computing, could present risks to cryptocurrencies and the Platform by rendering
                  ineffective the cryptographic consensus mechanism that underpins the Platform,
                  which could result in the theft, loss or decreased utility of the Nodes and/or
                  Tokens. Smart contracts, blockchain application software and blockchain platforms
                  and protocols are still in an early development stage and relatively unproven.
                  There is no warranty or assurance that the process for creating Nodes and/or
                  Tokens will be uninterrupted or error-free and there is an inherent risk that the
                  software could contain defects, weaknesses, vulnerabilities, viruses or bugs
                  causing, inter alia, the complete loss of contributions and/or Nodes and/or
                  Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risk of Lack of Adoption or Use of the Platform: While the Nodes and/or Tokens
                  should not be viewed as an investment, they may have value over time. That value
                  may be limited or non-existent if the Platform lacks acceptance, use and adoption,
                  which may have an adverse impact on the Nodes and/or Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risk of an Illiquid Market for Nodes and/or Tokens: There may never be any
                  marketplace for Nodes and/or Tokens. There are currently no exchanges upon which
                  the Nodes and/or Tokens would trade. If exchanges do develop, they will likely be
                  relatively new and subject to poorly understood regulatory oversight. They may,
                  therefore, be more exposed to fraud and failure than established, regulated
                  exchanges for other products and have a negative impact on the Nodes and/or
                  Tokens. To the extent that any third party ascribes an external exchange value to
                  Nodes and/or Tokens (e.g. as denominated in a crypto or fiat currency), such value
                  may be extremely volatile and diminish to zero. If (despite your representations
                  to us to the contrary) you are holding Nodes and/or Tokens as a form of investment
                  on a speculative basis or otherwise, or for a financial purpose, with the
                  expectation or desire that their inherent, intrinsic or cash-equivalent value may
                  increase with time, you assume all risks associated with such speculation or
                  actions, and any errors associated therewith, and accept that the Nodes and/or
                  Tokens are not offered by the Company or its Affiliates on an investment basis.
                  Holders of Nodes and/or Tokens should be prepared to hold their Nodes and/or
                  Tokens indefinitely, as there is no guarantee that holders will be able to
                  transfer, sell or exchange their tokens or otherwise redeem them as currency if
                  adoption of the Platform is limited or unsuccessful. Further, we make no
                  representations as to the future market price of Nodes and/or Tokens and no
                  representations that the price per Token determined by a future market will be
                  equal to or higher than the purchase price of the rights hereunder.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risk of Dissolution of the Platform: It is possible that, due to any number of
                  reasons, including development issues with the Platform, the failure of business
                  relationships, lack of public interest, lack of funding, or competing intellectual
                  property claims, the Platform may no longer be viable as a business or otherwise
                  and may dissolve or fail to maintain commercial or legal viability, or be
                  abandoned. There is no assurance that you will receive any benefits through the
                  Nodes and/or Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risk of Malfunction in the Platform: It is possible that the Platform malfunctions
                  in an unfavourable way, including one that results in the loss of the Nodes and/or
                  Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risk Arising from Lack of Governance Rights: Because the Nodes and/or Tokens
                  confer only limited governance rights with respect to the Platform; all decisions
                  involving the Company (including to sell or liquidate the Company) will be made by
                  the Company acting in its sole and absolute discretion, and substantially all
                  decisions involving the Platform including, but not limited to, decisions by the
                  Platform Operator to discontinue the Platform, will be made by the Platform
                  Operator acting in its sole and absolute discretion. These decisions could
                  adversely affect the Platform and/or Nodes and/or Tokens You hold.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risks Associated with Incomplete Information regarding the Nodes and/or Tokens and
                  the Platform: You will not have full access to all the information relevant to the
                  Company, the Nodes and/or Tokens and/or the Platform. Neither the Company nor the
                  Platform Operator is required to update you on the progress of the Platform. You
                  are responsible for making your own decision in respect of the acquisition of the
                  Nodes and/or Tokens. The Company does not provide you with any recommendation or
                  advice in respect of the acquisition of the Nodes and/or Tokens. You may not rely
                  on the Company to provide you with complete or up to date information.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  No Fiduciary Relationship: The holders of Nodes and/or Tokens will not be in any
                  fiduciary, partnership, trustee, agency or similar relationship with the Company
                  or any of its Affiliates and will not be owed any fiduciary duty by the Company or
                  any of its Affiliates. The holders of Nodes and/or Tokens have no direct
                  management, equity, voting or similar rights in the Company or any of its
                  Affiliates. However, without limitation to the above, the Company reserves all
                  rights with respect to pursuing any form of decentralized governance should it so
                  determine that doing so would be in the best interests of the holders of Nodes
                  and/or Tokens from time to time.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Changes to Token and Platform for Legal Compliance: In order to seek compliance
                  with (or to seek to mitigate the impact of) any laws, statutes, ordinances, rules,
                  regulations, judgments, injunctions, orders, treaties, administrative acts or
                  decrees of any nation or government, any state or other political subdivision
                  thereof, any entity exercising legislative, judicial or administrative functions
                  of or pertaining to government, including, without limitation, any government
                  authority, agency, department, board, commission or instrumentality, and any
                  court, tribunal or arbitrator(s) of competent jurisdiction, and any
                  self-regulatory organization believed by the Company or its Affiliates to apply to
                  or affect the Company or its Affiliates, the Platform or the Nodes and/or Tokens,
                  the Company may in its sole and absolute discretion take such steps as it
                  considers necessary or convenient to comply with such matters including, without
                  limitation, the termination of the Nodes and/or Tokens and/or the Platform. In
                  addition, the Company may take such steps as it considers necessary or convenient
                  where it believes or suspects the Nodes and/or Tokens may be used, trafficked or
                  applied in the attempted furtherance of money laundering, terrorist financing, tax
                  evasion or other unlawful activity or where it believes the Platform is no longer
                  viable.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Regulation Risk: Regulation of (i) tokens (including the Nodes and/or Tokens);
                  (ii) cryptocurrencies (iii) blockchain technologies; and (iv) cryptocurrency
                  exchanges is currently underdeveloped and is likely to evolve rapidly, vary
                  significantly among international, national, federal, state and local
                  jurisdictions and is subject to significant uncertainty. Various legislative and
                  executive bodies in the United States, South Korea, China, Singapore, among other
                  countries, are currently considering, or may in the future consider, laws,
                  regulations, guidance, or other actions, which may severely impact the development
                  and growth of the Platform, the Company and the Nodes and/or Tokens. Other
                  countries may adopt similar approaches. Failure by the Company or users of the
                  Platform to comply with any laws, rules and regulations, some of which may not
                  exist yet or are subject to interpretation and may be subject to change, could
                  result in a variety of adverse consequences, including civil penalties and fines.
                  New or changing laws and regulations or interpretations of existing laws and
                  regulations would likely have numerous material adverse consequences on the
                  Company and the Nodes and/or Tokens. Therefore, there can be no assurance that any
                  new or continuing regulatory scrutiny or initiatives will not have a material
                  adverse impact on the value of the Nodes and/or Tokens or impede the activities of
                  the Company.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Company Retains Exclusive Rights: The Company has the exclusive right, in its sole
                  and absolute discretion, to address and remediate any of the operational, legal or
                  regulatory risks presented as of the date hereof or hereafter. In the exercise of
                  such rights, it is possible that the Company may determine that the continued
                  development of the Platform is not feasible. Accordingly, there is a material risk
                  that the Company and its Affiliates may not successfully continue to develop,
                  market and operate the Platform and the Nodes and/or Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risk of Abandonment / Lack of Success: The creation and issuance of the Nodes
                  and/or Tokens and Platform may be abandoned for a number of reasons, including
                  lack of interest from the public, lack of funding, lack of commercial success or
                  prospects (e.g. caused by competing projects). There is no assurance that, even if
                  the Platform is partially or fully developed and launched, you will receive any
                  benefits through the Nodes and/or Tokens.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Risk Associated with Markets for Nodes and/or Tokens: To the extent that any third
                  parties ascribe an external exchange value to the Nodes and/or Tokens, such value
                  may be extremely volatile and diminish to zero. You should not enter into this
                  Agreement or seek to acquire Nodes and/or Tokens as an investment on a speculative
                  basis or otherwise, or for a financial purpose, with the expectation or desire
                  that their inherent, intrinsic or cash-equivalent value may increase with time.
                  You assume all risks associated with such speculation or actions, and any errors
                  associated therewith, and accept that the Nodes and/or Tokens are not offered on
                  an investment basis. You further acknowledge that any funds you consider to be
                  invested in the Nodes and/or Tokens will not be protected, guaranteed or
                  reimbursed by any governmental, regulatory or other entity.
                </Trans>
              </p>
              <p className="my-3">
                <Trans>
                  Unanticipated Risks: Cryptographic tokens are a relatively new and comparatively
                  untested technology. In addition to the risks discussed herein, there are risks
                  that the Company cannot anticipate. Further risks may materialize as unanticipated
                  combinations or variations of the discussed risks or the emergence of new risks.
                </Trans>
              </p>
            </div>
          </div>
          {onAgree && (
            <div className="flex pl-8 pt-4">
              <Input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.currentTarget.checked)}
              />
              <p className="ml-4">
                <Trans>Agree and sign</Trans>
              </p>
            </div>
          )}
          {onAgree && (
            <div className="flex w-full justify-end pr-8">
              <Button
                className={clsx(
                  'btn-lg btn-primary justify-end px-10 disabled:bg-gray-500 disabled:text-white disabled:opacity-50'
                )}
                disabled={!agree}
                onClick={onAgree}>
                <Trans>Accept</Trans>
              </Button>
            </div>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default TermsOfServiceModal;
