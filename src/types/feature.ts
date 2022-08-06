export interface FeatureMatcher {
    (text: string): boolean;
}

export interface FeatureAnswer {
    (text: string): string;
}

export interface Feature {
    canAnswer: FeatureMatcher;
    getAnswer: FeatureAnswer;
}
