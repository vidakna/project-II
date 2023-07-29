import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const TermAndContions = () => {
  return (
    <>
      <Meta title={"Term And Conditions"} />
      <BreadCrumb title="Term And Conditions" />
      <Container className="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
            <h3>Terms & Conditions</h3>
            <p>Please read the Terms & Conditions before using this website. The site holds absolute right of changes, modifications, additions and removals of Terms & Conditions at any time. Prior notice will not be provided for changes of any Terms & Conditions in this agreement.</p>
            <h4>Copyright</h4>
            <p>Advertisers grant Exmarketing.lk a perpetual, royalty-free, irrevocable, non-exclusive right and license to use, reproduce, modify, adapt, publish, translate, create derivative works from and distribute such content into any form, medium or technology as we use now or updated later
            The material (including the Content, and any other content, software or services) contained on Exmarketing.lk are the property of its owners, its subsidiaries, affiliates and/or third party licensors. Any intellectual property rights, such as copyright, trademarks, service marks, trade names and other distinguishing brands on the Web Site are the property of Exmarketing.lk. No material on this site may be copied, reproduced, republished, installed, posted, transmitted, stored or distributed without written consent from Exmarketing.lk.
             </p>
             <h4>Privacy</h4>
             <p>Exmarketing.lk is expressly authorized by the users and advertisers to disclose the information collected from such parties to the Affiliate companies and internal administrative purposes.</p>
             <h4>Email address of the users</h4>
             <p>It is a mandatory to submit a valid email address prior to post an advertisement. The email addresses so submitted are not publicly displayed in the site and other users may send emails only through Exmarketing.lk. and vice versa</p>
             <h4>General</h4>
             <p>Advertisers and users are responsible for ensuring that advertising content, text, images, graphics and video ("Content") uploaded for inclusion on exmarketing.lk complies with all applicable laws governed. Exmarketing.lk holds no responsibility for any illegality or any inaccuracy of the content.
            The advertisers and users guarantee that their content does not violate any copyright, intellectual property rights or other rights of any person or entity and agree to release Exmarketing.lk from all the obligations, liabilities and claims arising in connection with the use of the service.
            Exmarketing.lk takes no responsibility in the content of the advertisement, the products or services being sold through the advertisements or actual transactions through the buyers and sellers though the advertisements. Therefore Exmarketing.lk takes no responsibility on the quality, safety, truth, accuracy or legality of the products offered.
            Exmarketing.lk reserves the right to cooperate with authorities in case of any content violates the law. The identity of advertisers, users or buyers may be determined.
            Advertisers are allowed to post the advertisements in Exmarketing.lk website for free of charge. The users shall use the website also for free and Exmarketing.lk does not hold any responsibility of any payment made for a third party in this regard.
              </p>
          
          </div>
        </div>
      </Container>
    </>
  );
};

export default TermAndContions;
