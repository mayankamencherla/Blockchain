import React from 'react'
import styles from "./MineScreen.css"
const MineScreen = () => {
  return (
    <div className={styles.Body}>
        <div class="container content">
        <div class="row gutters">
            <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="plan-card plan-one">
                    <div class="pricing-header">
                        <h4 class="plan-title">Basic</h4>
                        <div class="plan-cost">$129.00</div>
                        <div class="plan-save">Save $29.00</div>
                    </div>
                    <ul class="plan-features">
                        <li>5GB Linux Web Space</li>
                        <li>5 MySQL Databases</li>
                        <li>500 Emails</li>
                        <li>250Gb mothly Transfer</li>
                        <li class="text-muted"><del>24/7 Tech Support</del></li>
                        <li class="text-muted"><del>Daily Backups</del></li>
                    </ul>
                    <div class="plan-footer">
                        <a href="#" class="btn btn-info btn-lg btn-rounded">Select Plan</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="plan-card plan-one">
                    <div class="pricing-header orange">
                        <h4 class="plan-title">Standard</h4>
                        <div class="plan-cost">$189.00</div>
                        <div class="plan-save">Save $49.00</div>
                    </div>
                    <ul class="plan-features">
                        <li>10GB Linux Web Space</li>
                        <li>10 MySQL Databases</li>
                        <li>1000 Emails</li>
                        <li>750Gb mothly Transfer</li>
                        <li>24/7 Tech Support</li>
                        <li class="text-muted"><del>Daily Backups</del></li>
                    </ul>
                    <div class="plan-footer">
                        <a href="#" class="btn btn-danger btn-lg btn-rounded">Select Plan</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="plan-card plan-one">
                    <div class="pricing-header green">
                        <h4 class="plan-title">Premium</h4>
                        <div class="plan-cost">$219.00</div>
                        <div class="plan-save">Save $99.00</div>
                    </div>
                    <ul class="plan-features">
                        <li>50GB Linux Web Space</li>
                        <li>100 MySQL Databases</li>
                        <li>Unlimited Emails</li>
                        <li>1000Gb mothly Transfer</li>
                        <li>24/7 Tech Support</li>
                        <li>Daily Backups</li>
                    </ul>
                    <div class="plan-footer">
                        <a href="#" class="btn btn-info btn-lg btn-rounded">Select Plan</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
  )
}

export default MineScreen